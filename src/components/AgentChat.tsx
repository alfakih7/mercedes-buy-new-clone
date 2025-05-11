import React, { useState, useRef, useEffect } from "react";
import useConversationLogger from "../hooks/useConversationLogger";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface AgentChatProps {
  agentId: string;
  agentName: string;
  agentRole: string;
  agentAvatar: string;
  backgroundColor: string;
  onClose: () => void;
}

const AgentChat: React.FC<AgentChatProps> = ({
  agentId,
  agentName,
  agentRole,
  agentAvatar,
  backgroundColor,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Hello! I'm ${agentName}, your ${agentRole}. How can I help you today?`,
      sender: "agent",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize conversation logger
  const {
    conversationId,
    logUserMessage,
    logAgentMessage
  } = useConversationLogger({
    agentId,
    agentName,
    agentRole
  });
  
  // Log the welcome message when conversation starts
  useEffect(() => {
    if (conversationId) {
      logAgentMessage(`Hello! I'm ${agentName}, your ${agentRole}. How can I help you today?`);
    }
  }, [conversationId, agentName, agentRole, logAgentMessage]);
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Log user message
    logUserMessage(inputText);
    
    setInputText("");
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentResponseText = getAgentResponse(agentId, inputText);
      
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: agentResponseText,
        sender: "agent",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentResponse]);
      
      // Log agent response
      logAgentMessage(agentResponseText);
    }, 1000);
  };
  
  // Helper function to generate simple agent responses based on agent type
  const getAgentResponse = (agentId: string, userMessage: string): string => {
    const userMessageLower = userMessage.toLowerCase();
    
    // Generic responses
    if (userMessageLower.includes("hello") || userMessageLower.includes("hi")) {
      return `Hello! How can I assist you with ${agentRole.toLowerCase()} today?`;
    }
    
    if (userMessageLower.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Agent-specific responses
    switch (agentId) {
      case "recruiter":
        return "As a recruitment specialist, I can help you with job descriptions, candidate screening, and interview scheduling. What specific recruitment task are you working on?";
      case "hr-advisor":
        return "I can provide guidance on HR policies, employee benefits, and workplace regulations. What specific HR topic would you like information about?";
      case "contract-analyst":
        return "I can help you analyze contracts and highlight important clauses. Would you like me to review a specific contract or clause for you?";
      case "inventory-manager":
        return "I can provide insights on inventory levels and stock management. What specific inventory challenge are you facing?";
      case "market-researcher":
        return "I can analyze market trends and consumer behavior for your product development. What specific market would you like me to research?";
      case "risk-assessor":
        return "I can identify potential business risks and suggest mitigation strategies. What area of risk are you concerned about?";
      case "it-support":
        return "I can help troubleshoot common IT issues. What technical problem are you experiencing?";
      case "creative-director":
        return "I can help with creative brainstorming and concept development. What creative project are you working on?";
      default:
        return "I understand your query. How else can I assist you with my expertise in this area?";
    }
  };
  
  return (
    <div style={{
      position: "fixed",
      bottom: 30,
      right: 30,
      width: 380,
      height: 520,
      backgroundColor: "#fff",
      borderRadius: 12,
      boxShadow: "0 5px 25px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 1000
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: backgroundColor || "#0a75c9",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: 8, 
            overflow: "hidden",
            marginRight: 12,
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <img 
              src={agentAvatar} 
              alt={agentName} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
          <div>
            <div style={{ 
              color: "#fff", 
              fontWeight: 600, 
              fontSize: 16,
              marginBottom: 2
            }}>
              {agentName}
            </div>
            <div style={{ 
              color: "rgba(255,255,255,0.8)", 
              fontSize: 12 
            }}>
              {agentRole}
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 20,
            padding: 4
          }}
        >
          ×
        </button>
      </div>
      
      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        display: "flex",
        flexDirection: "column"
      }}>
        {messages.map(message => (
          <div 
            key={message.id}
            style={{
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "70%",
              marginBottom: 12
            }}
          >
            <div style={{
              backgroundColor: message.sender === "user" ? "#0a75c9" : "#f1f1f1",
              color: message.sender === "user" ? "#fff" : "#333",
              padding: "10px 14px",
              borderRadius: message.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              fontSize: 14
            }}>
              {message.text}
            </div>
            <div style={{
              fontSize: 11,
              color: "#999",
              marginTop: 4,
              textAlign: message.sender === "user" ? "right" : "left"
            }}>
              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div style={{
        padding: "12px 16px",
        borderTop: "1px solid #eee",
        display: "flex",
        alignItems: "center"
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            border: "1px solid #ddd",
            borderRadius: 20,
            padding: "8px 16px",
            fontSize: 14,
            outline: "none"
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            background: "#0a75c9",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            width: 36,
            height: 36,
            marginLeft: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AgentChat; 