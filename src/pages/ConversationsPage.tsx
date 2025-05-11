import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConversationLogger, { ConversationLog } from "../utils/ConversationLogger";

const ConversationsPage: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationLog[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationLog | null>(null);
  
  useEffect(() => {
    // Load conversations when component mounts
    setConversations(ConversationLogger.getConversations());
  }, []);
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Function to export conversations as JSON
  const handleExportAll = () => {
    const jsonData = ConversationLogger.exportAllConversations();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gargash-ai-conversations-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // Function to clear all conversations
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all conversation logs? This cannot be undone.')) {
      ConversationLogger.clearAllConversations();
      setConversations([]);
      setSelectedConversation(null);
    }
  };
  
  return (
    <main style={{ flex: 1, background: "#f8f9fa" }}>
      {/* Header */}
      <div style={{ 
        background: "linear-gradient(135deg, #00253e 0%, #1a4c7c 100%)", 
        color: "white",
        padding: "40px 0",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>
            Gargash AI Conversations
          </h1>
          <p style={{ fontSize: "16px", opacity: 0.9 }}>
            Review and manage your conversations with Gargash AI assistants
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px", display: "flex", gap: "30px" }}>
        {/* Sidebar - Conversations List */}
        <div style={{ 
          width: "320px", 
          background: "white", 
          borderRadius: "8px", 
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Sidebar Header */}
          <div style={{ 
            padding: "16px", 
            borderBottom: "1px solid #eee", 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h2 style={{ fontSize: "18px", margin: 0 }}>Conversations</h2>
            <div style={{ display: "flex", gap: "8px" }}>
              <button 
                onClick={handleExportAll} 
                style={{ 
                  background: "none", 
                  border: "1px solid #0a75c9", 
                  color: "#0a75c9", 
                  padding: "4px 8px", 
                  borderRadius: "4px", 
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Export All
              </button>
              <button 
                onClick={handleClearAll}
                style={{ 
                  background: "none", 
                  border: "1px solid #d32f2f", 
                  color: "#d32f2f", 
                  padding: "4px 8px", 
                  borderRadius: "4px", 
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Clear All
              </button>
            </div>
          </div>
          
          {/* Conversations List */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {conversations.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#666" }}>
                <p>No conversations yet</p>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>
                  Chat with an AI agent to see logs here
                </p>
                <Link 
                  to="/gargash-agents" 
                  style={{ 
                    display: "inline-block", 
                    marginTop: "16px", 
                    color: "#0a75c9", 
                    textDecoration: "none" 
                  }}
                >
                  Go to Agents
                </Link>
              </div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {conversations.map(convo => (
                  <li 
                    key={convo.id}
                    onClick={() => setSelectedConversation(convo)}
                    style={{ 
                      padding: "16px",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                      background: selectedConversation?.id === convo.id ? "#f5f9ff" : "transparent"
                    }}
                  >
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      marginBottom: "4px" 
                    }}>
                      <span style={{ fontWeight: 600 }}>{convo.agentName}</span>
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        {convo.messages.length} messages
                      </span>
                    </div>
                    <div style={{ fontSize: "14px", marginBottom: "4px", color: "#555" }}>
                      {convo.agentRole}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {formatDate(convo.startTime)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Main Content - Conversation Details */}
        <div style={{ 
          flex: 1, 
          background: "white", 
          borderRadius: "8px", 
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div style={{ 
                padding: "16px", 
                borderBottom: "1px solid #eee", 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <h2 style={{ fontSize: "18px", margin: "0 0 4px 0" }}>
                    Conversation with {selectedConversation.agentName}
                  </h2>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {formatDate(selectedConversation.startTime)}
                    {selectedConversation.endTime && (
                      <> to {formatDate(selectedConversation.endTime)}</>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const jsonData = ConversationLogger.exportConversation(selectedConversation.id);
                    if (jsonData) {
                      const blob = new Blob([jsonData], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `conversation-${selectedConversation.agentName.toLowerCase().replace(/\s+/g, '-')}-${new Date(selectedConversation.startTime).toISOString().split('T')[0]}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }
                  }}
                  style={{ 
                    background: "#0a75c9", 
                    color: "white", 
                    border: "none", 
                    padding: "8px 16px", 
                    borderRadius: "4px", 
                    fontSize: "14px",
                    cursor: "pointer"
                  }}
                >
                  Export
                </button>
              </div>
              
              {/* Conversation Messages */}
              <div style={{ 
                flex: 1, 
                overflowY: "auto", 
                padding: "20px", 
                display: "flex", 
                flexDirection: "column", 
                gap: "16px" 
              }}>
                {selectedConversation.messages.map(message => (
                  <div 
                    key={message.id}
                    style={{
                      alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                      maxWidth: "70%"
                    }}
                  >
                    <div style={{
                      backgroundColor: message.sender === "user" ? "#0a75c9" : "#f1f1f1",
                      color: message.sender === "user" ? "#fff" : "#333",
                      padding: "10px 16px",
                      borderRadius: message.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      fontSize: "14px"
                    }}>
                      {message.text}
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#999",
                      marginTop: "4px",
                      textAlign: message.sender === "user" ? "right" : "left"
                    }}>
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              flex: 1,
              padding: "20px",
              color: "#666",
              textAlign: "center"
            }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: "#f4f6f8",
                borderRadius: "50%",
                marginBottom: "16px"
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 9H17" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 13H13" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ margin: "0 0 8px 0", fontWeight: 500 }}>Select a Conversation</h3>
              <p style={{ maxWidth: "400px", margin: 0 }}>
                Choose a conversation from the sidebar to view the details here. 
                Your conversations with Gargash AI assistants are saved for your reference.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ConversationsPage; 