import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

// Import required components and data
import { AGENT_CATEGORIES } from "./GargashAgents"; // We'll move this data to a shared location later
import { getAgentSystemPrompt } from "../utils/agentPrompts";

// Message interface
interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: number;
}

const AgentConversation: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [agent, setAgent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Find the agent from all categories
    let foundAgent = null;
    for (const category of AGENT_CATEGORIES) {
      const found = category.agents.find(a => a.id === agentId);
      if (found) {
        foundAgent = found;
        break;
      }
    }
    
    if (foundAgent) {
      setAgent(foundAgent);
      
      // Load conversation history from localStorage if exists
      const conversationKey = `conversation_${agentId}`;
      const savedConversation = localStorage.getItem(conversationKey);
      if (savedConversation) {
        setMessages(JSON.parse(savedConversation));
      } else {
        // Add welcome message
        setMessages([
          {
            id: "welcome",
            sender: "agent",
            text: `Hello, I'm ${foundAgent.name}, your ${foundAgent.role}. How can I help you today?`,
            timestamp: Date.now()
          }
        ]);
      }
    } else {
      // Agent not found, redirect to agents page
      navigate("/gargash-agents");
    }
  }, [agentId, navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Save conversation to localStorage
    if (agent && messages.length > 0) {
      const conversationKey = `conversation_${agentId}`;
      localStorage.setItem(conversationKey, JSON.stringify(messages));
    }
  }, [messages, agentId, agent]);
  
  const handleSendMessage = async () => {
    if (inputText.trim() === "" || !agent || !agentId) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: inputText.trim(),
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    
    // Get agent system prompt
    const agentPrompt = getAgentSystemPrompt(agentId);
    
    if (!agentPrompt) {
      console.error(`No system prompt found for agent: ${agentId}`);
      return;
    }
    
    try {
      // Prepare conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));
      
      // Prepare request payload
      const payload = {
        type: "agent",
        agent: {
          id: agentId,
          name: agent.name,
          uniqueName: agentPrompt.uniqueName,
          role: agent.role
        },
        systemPrompt: agentPrompt.systemPrompt,
        messages: [
          ...conversationHistory,
          { role: "user", content: userMessage.text }
        ]
      };
      
      console.log("Sending request with payload:", payload);
      
      // Send POST request to API
      const response = await fetch("https://anas42.app.n8n.cloud/webhook/2088f349-676c-45c5-a6cd-10598fd7e526", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      // Parse the API response
      const responseData = await response.json();
      console.log("API response:", responseData);
      
      // Extract the 'output' from the response (the API returns a single object with an output property)
      const outputText = responseData.output || `I'm sorry, but I couldn't process your request at this time.`;
      
      // Add the agent message using the actual API response
      const agentMessage: Message = {
        id: `agent_${Date.now()}`,
        sender: "agent",
        text: outputText,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        sender: "agent",
        text: "I'm sorry, there was an error processing your request. Please try again later.",
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };
  
  if (!agent) {
    return <div>Loading...</div>;
  }
  
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "calc(100vh - 72px)", 
      background: "#f8f9fa" 
    }}>
      {/* Add global styles for markdown content */}
      <style>
        {`
          .markdown-content {
            font-family: inherit;
          }
          .markdown-content h1 {
            font-size: 1.5em;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          .markdown-content h2 {
            font-size: 1.3em;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          .markdown-content h3 {
            font-size: 1.1em;
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
          .markdown-content ul, .markdown-content ol {
            padding-left: 1.5em;
            margin-bottom: 1em;
          }
          .markdown-content li {
            margin-bottom: 0.3em;
          }
          .markdown-content p {
            margin-bottom: 0.7em;
          }
          .markdown-content blockquote {
            border-left: 3px solid #ccc;
            padding-left: 1em;
            margin: 0.5em 0;
            font-style: italic;
          }
          .markdown-content code {
            background-color: rgba(0, 0, 0, 0.05);
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: monospace;
          }
          .markdown-content pre {
            background-color: rgba(0, 0, 0, 0.05);
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
            margin: 0.5em 0;
          }
          .markdown-content hr {
            border: none;
            border-top: 1px solid #ccc;
            margin: 1em 0;
          }
        `}
      </style>
      
      {/* Header */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        padding: "20px 30px", 
        borderBottom: "1px solid #eee", 
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <button 
          onClick={() => navigate("/gargash-agents")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderRadius: "50%",
            transition: "background 0.2s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#f2f2f2"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div style={{ 
          display: "flex", 
          alignItems: "center" 
        }}>
          <div style={{ 
            width: "50px", 
            height: "50px", 
            borderRadius: "12px", 
            overflow: "hidden",
            marginRight: "16px",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
          <div>
            <h2 style={{ 
              margin: "0 0 4px 0", 
              fontSize: "20px", 
              fontWeight: 600,
              color: "#333" 
            }}>
              {agent.name}
            </h2>
            <p style={{ 
              margin: "0", 
              fontSize: "14px", 
              color: "#555",
              fontWeight: 500
            }}>
              {agent.role}
            </p>
          </div>
        </div>
        
        <div style={{ marginLeft: "auto" }}>
          <button 
            onClick={() => {
              // Clear conversation
              const conversationKey = `conversation_${agentId}`;
              localStorage.removeItem(conversationKey);
              setMessages([
                {
                  id: "welcome",
                  sender: "agent",
                  text: `Hello, I'm ${agent.name}, your ${agent.role}. How can I help you today?`,
                  timestamp: Date.now()
                }
              ]);
            }}
            style={{
              background: "#f2f2f2",
              border: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#333",
              display: "flex",
              alignItems: "center",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e5e5e5"}
            onMouseLeave={e => e.currentTarget.style.background = "#f2f2f2"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
              <path d="M3 6H5H21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Clear Conversation
          </button>
        </div>
      </div>
      
      {/* Messages area */}
      <div style={{ 
        flex: 1, 
        padding: "30px", 
        overflowY: "auto",
        display: "flex",
        flexDirection: "column"
      }}>
        {messages.map(message => (
          <div 
            key={message.id}
            style={{
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "70%",
              marginBottom: "20px"
            }}
          >
            <div style={{
              background: message.sender === "user" ? "#0a75c9" : agent.backgroundColor,
              color: message.sender === "user" ? "white" : "#333",
              padding: "16px 20px",
              borderRadius: message.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              fontSize: "16px",
              lineHeight: 1.6
            }}>
              {message.sender === "user" ? (
                message.text
              ) : (
                <div className="markdown-content">
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              )}
            </div>
            <div style={{
              fontSize: "12px",
              color: "#888",
              marginTop: "6px",
              textAlign: message.sender === "user" ? "right" : "left"
            }}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div 
            style={{
              alignSelf: "flex-start",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <div style={{
              background: agent.backgroundColor,
              padding: "12px 20px",
              borderRadius: "20px 20px 20px 4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center"
            }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "4px" 
              }}>
                <div style={{ 
                  width: "8px", 
                  height: "8px", 
                  borderRadius: "50%", 
                  background: "#333",
                  opacity: 0.5,
                  animation: "dot-flashing 1s infinite alternate 0s"
                }} />
                <div style={{ 
                  width: "8px", 
                  height: "8px", 
                  borderRadius: "50%", 
                  background: "#333",
                  opacity: 0.5,
                  animation: "dot-flashing 1s infinite alternate 0.3s"
                }} />
                <div style={{ 
                  width: "8px", 
                  height: "8px", 
                  borderRadius: "50%", 
                  background: "#333",
                  opacity: 0.5,
                  animation: "dot-flashing 1s infinite alternate 0.6s"
                }} />
              </div>
            </div>
            <style>
              {`
                @keyframes dot-flashing {
                  0% { opacity: 0.5; }
                  100% { opacity: 1; }
                }
              `}
            </style>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div style={{ 
        padding: "20px 30px", 
        borderTop: "1px solid #eee",
        background: "white",
        display: "flex",
        alignItems: "center"
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder={`Message ${agent.name}...`}
          style={{
            flex: 1,
            padding: "16px 20px",
            borderRadius: "30px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
            transition: "border 0.2s ease, box-shadow 0.2s ease"
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid #0a75c9";
            e.target.style.boxShadow = "0 0 0 4px rgba(10, 117, 201, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #ddd";
            e.target.style.boxShadow = "none";
          }}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={inputText.trim() === "" || isLoading}
          style={{
            background: "#0a75c9",
            color: "white",
            border: "none",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "16px",
            cursor: (inputText.trim() === "" || isLoading) ? "not-allowed" : "pointer",
            opacity: (inputText.trim() === "" || isLoading) ? 0.7 : 1,
            transition: "transform 0.2s ease, opacity 0.2s ease"
          }}
          onMouseEnter={(e) => {
            if (inputText.trim() !== "" && !isLoading) {
              e.currentTarget.style.transform = "scale(1.05)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {isLoading ? (
            <div style={{ 
              width: "20px", 
              height: "20px", 
              border: "2px solid rgba(255,255,255,0.3)",
              borderTop: "2px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AgentConversation; 