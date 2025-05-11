import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import { saveChatToFile } from '../services/SaveChatService';

interface Message {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  content: string;
  timestamp: string;
}

interface ChatInterfaceProps {
  customerId: string;
  customerName?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ customerId, customerName = 'Customer' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to fetch chat history
        // For demo, we'll parse the sample conversation file
        if (customerId === 'AM001') {
          const response = await fetch('/src/AM001-no.txt');
          if (!response.ok) {
            throw new Error('Failed to fetch conversation data');
          }
          
          const conversationText = await response.text();
          const parsedMessages = parseConversationHistory(conversationText);
          setMessages(parsedMessages);
        } else {
          // Default placeholder messages if no history exists
          setMessages([
            {
              id: '1',
              sender: 'system',
              content: 'Chat history will appear here.',
              timestamp: new Date().toISOString()
            }
          ]);
        }
      } catch (err: any) {
        console.error('Error loading chat history:', err);
        setError(`Failed to load chat history: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChatHistory();
  }, [customerId]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Parse conversation history from text file
  const parseConversationHistory = (text: string): Message[] => {
    const messages: Message[] = [];
    
    try {
      // First, add a system message about loading the conversation
      messages.push({
        id: 'system-init',
        sender: 'system',
        content: 'Loading conversation history for Ahmed Al Mansouri',
        timestamp: new Date().toISOString()
      });
      
      // Extract and parse session blocks
      const sessionRegex = /### SESSION \d+: ([^-]+) - ([A-Za-z]+ \d+, \d{4})/g;
      let sessionMatch;
      let sessionNumber = 0;
      const sessionStarts: {index: number, date: string, title: string}[] = [];
      
      // Find all session starts
      while ((sessionMatch = sessionRegex.exec(text)) !== null) {
        sessionStarts.push({
          index: sessionMatch.index,
          title: sessionMatch[1].trim(),
          date: sessionMatch[2].trim()
        });
      }
      
      // Process each session
      for (let i = 0; i < sessionStarts.length; i++) {
        const currentSession = sessionStarts[i];
        const nextSessionIndex = i < sessionStarts.length - 1 ? 
          sessionStarts[i + 1].index : text.length;
        
        // Extract session content
        const sessionContent = text.substring(
          currentSession.index,
          nextSessionIndex
        );
        
        sessionNumber++;
        
        // Add a session header message
        messages.push({
          id: `session-${sessionNumber}`,
          sender: 'system',
          content: `${currentSession.title} (${currentSession.date})`,
          timestamp: new Date(currentSession.date).toISOString()
        });
        
        // Process messages in this session
        let currentSender: 'customer' | 'agent' | 'system' | null = null;
        let currentMessageContent = '';
        let lines = sessionContent.split('\n');
        let messageId = 0;
        
        for (let j = 1; j < lines.length; j++) {
          const line = lines[j].trim();
          if (!line) continue;
          
          // Check for a new message
          const messageStart = line.match(/^\[(CUSTOMER|AGENT|SYSTEM)\]\s+(.*)/i);
          
          if (messageStart) {
            // Save previous message if there was one
            if (currentSender && currentMessageContent) {
              messageId++;
              
              // Create timestamp - add variation within the day
              const messageDate = new Date(currentSession.date);
              messageDate.setHours(9 + messageId % 12); // Distribute across working hours
              messageDate.setMinutes((messageId * 7) % 60); // Vary minutes
              
              messages.push({
                id: `session-${sessionNumber}-msg-${messageId}`,
                sender: currentSender,
                content: currentMessageContent.trim(),
                timestamp: messageDate.toISOString()
              });
            }
            
            // Start new message
            const senderType = messageStart[1].toUpperCase();
            switch (senderType) {
              case 'CUSTOMER':
                currentSender = 'customer';
                break;
              case 'AGENT':
                currentSender = 'agent';
                break;
              case 'SYSTEM':
                currentSender = 'system';
                break;
              default:
                currentSender = null;
            }
            
            currentMessageContent = messageStart[2];
          } else if (currentSender) {
            // Continue previous message
            currentMessageContent += '\n' + line;
          }
        }
        
        // Add the last message in the session
        if (currentSender && currentMessageContent) {
          messageId++;
          const messageDate = new Date(currentSession.date);
          messageDate.setHours(9 + messageId % 12);
          messageDate.setMinutes((messageId * 7) % 60);
          
          messages.push({
            id: `session-${sessionNumber}-msg-${messageId}`,
            sender: currentSender,
            content: currentMessageContent.trim(),
            timestamp: messageDate.toISOString()
          });
        }
      }
      
      // If no messages were parsed, add a fallback message
      if (messages.length <= 1) {
        messages.push({
          id: 'fallback',
          sender: 'system',
          content: 'Could not parse conversation history. Please check the format.',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error parsing conversation history:', error);
      messages.push({
        id: 'error',
        sender: 'system',
        content: 'Error parsing conversation history. Please try again.',
        timestamp: new Date().toISOString()
      });
    }
    
    return messages;
  };
  
  // Format timestamp for display
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Create new message
    const message: Message = {
      id: `new-${Date.now()}`,
      sender: 'agent', // Always send as agent in this interface
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    // Add to messages
    setMessages(prevMessages => [...prevMessages, message]);
    
    // Clear input
    setNewMessage('');
    
    // In a real app, you would send this message to an API/backend
    console.log('Sending message:', message);
  };
  
  // Function to handle saving chat data when Ahmed's messages are clicked
  const handleSaveChat = () => {
    if (customerId === 'AM001' || customerName.includes('Ahmed')) {
      try {
        // Extract important keywords and create a summary
        const keyVehicles = ['S-Class', 'S 450', 'S 580', 'GLC 300', 'EQS', 'GAC GS8', 'BMW 7 Series'];
        const keyPreferences = ['technology', 'luxury', 'pricing', 'trade-in', 'financing', 'electric'];
        
        // Create a summary of the conversation
        const summary = {
          customer: customerName,
          id: customerId,
          date: new Date().toLocaleDateString(),
          interests: [] as string[],
          budget: 'AED 220,000 (mentioned), considering financing options',
          models: [] as string[],
          loyalty: {
            tier: selectedCustomerLoyalty.tier,
            points: selectedCustomerLoyalty.points
          },
          notes: 'Customer comparing Mercedes S-Class with GAC GS8 and curious about EQS. Concerned about charging infrastructure for electric vehicles.'
        };
        
        // Extract vehicle models mentioned in the conversation
        messages.forEach(msg => {
          keyVehicles.forEach(vehicle => {
            if (msg.content.includes(vehicle) && !summary.models.includes(vehicle)) {
              summary.models.push(vehicle);
            }
          });
          
          // Extract preferences
          keyPreferences.forEach(pref => {
            if (msg.content.toLowerCase().includes(pref) && !summary.interests.includes(pref)) {
              summary.interests.push(pref);
            }
          });
        });
        
        // Use the service to save enhanced data to file
        const enhancedMessages = [
          ...messages,
          {
            id: 'summary',
            sender: 'system',
            content: `CONVERSATION SUMMARY:\n${JSON.stringify(summary, null, 2)}`,
            timestamp: new Date().toISOString()
          }
        ];
        
        const success = saveChatToFile(enhancedMessages, customerName, customerId);
        
        if (success) {
          const today = new Date().toISOString().split('T')[0];
          const filename = `chat_${customerId}_${today}.txt`;
          console.log(`Chat data with summary for ${customerName} saved successfully to ${filename}`);
          alert(`Chat data with summary saved to ${filename}`);
        } else {
          alert('Failed to save chat data');
        }
      } catch (error) {
        console.error('Error saving chat data:', error);
        alert('Error saving chat data');
      }
    }
  };
  
  const selectedCustomerName = customerName || "Ahmed Al Mansouri";
  const selectedCustomerLoyalty = {
    tier: "Platinum",
    points: 12500
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
      border: '1px solid rgba(0,0,0,0.05)',
      background: 'white'
    }}>
      <ChatHeader 
        customerName={selectedCustomerName}
        loyaltyTier={selectedCustomerLoyalty.tier}
        loyaltyPoints={selectedCustomerLoyalty.points}
        onlineStatus="offline"
        lastSeen="2 hours ago"
      />
      
      {/* Chat messages */}
      <div style={{
        flex: '1',
        overflowY: 'auto',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        background: '#f8f9fa'
      }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              border: '3px solid rgba(90, 60, 192, 0.1)', 
              borderTopColor: '#5a3cc0',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : error ? (
          <div style={{ 
            padding: '15px', 
            color: '#d32f2f', 
            background: '#ffebee', 
            borderRadius: '10px',
            border: '1px solid #ffcdd2',
            textAlign: 'center'
          }}>
            {error}
          </div>
        ) : (
          <>
            {messages.map(message => (
              <div 
                key={message.id} 
                data-sender={message.sender}
                onClick={message.sender === 'customer' && (customerId === 'AM001' || customerName.includes('Ahmed')) ? handleSaveChat : undefined}
                style={{
                  alignSelf: message.sender === 'customer' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  width: message.sender === 'system' ? '100%' : 'auto',
                  marginBottom: message.sender === 'system' ? '12px' : '5px',
                  cursor: message.sender === 'customer' && (customerId === 'AM001' || customerName.includes('Ahmed')) ? 'pointer' : 'default'
                }}
              >
                {message.sender === 'system' ? (
                  <div style={{
                    background: 'rgba(55, 33, 99, 0.06)',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    margin: '5px 0',
                    fontWeight: '500'
                  }}>
                    {message.content}
                  </div>
                ) : (
                  <>
                    <div style={{
                      background: message.sender === 'customer' ? 'linear-gradient(135deg, #5a3cc0 0%, #7c4dff 100%)' : 'white',
                      color: message.sender === 'customer' ? 'white' : '#333',
                      padding: '15px 20px',
                      borderRadius: message.sender === 'customer' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      border: message.sender === 'customer' ? 'none' : '1px solid rgba(0,0,0,0.08)',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap',
                      transition: 'box-shadow 0.2s ease',
                      maxWidth: '100%',
                      overflowX: 'hidden',
                      wordWrap: 'break-word'
                    }}>
                      {message.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < message.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#999',
                      marginTop: '5px',
                      textAlign: message.sender === 'customer' ? 'right' : 'left',
                      fontWeight: '500'
                    }}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} style={{ height: '20px' }} />
          </>
        )}
      </div>
      
      {/* Chat input */}
      <form 
        onSubmit={handleSendMessage}
        style={{
          padding: '20px 25px',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          background: 'white'
        }}
      >
        <div style={{
          flex: '1',
          position: 'relative'
        }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '30px',
              border: '1px solid rgba(0,0,0,0.1)',
              fontSize: '15px',
              outline: 'none',
              transition: 'border 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 0 0 0 rgba(90, 60, 192, 0)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#5a3cc0';
              e.target.style.boxShadow = '0 0 0 3px rgba(90, 60, 192, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,0,0,0.1)';
              e.target.style.boxShadow = '0 0 0 0 rgba(90, 60, 192, 0)';
            }}
          />
          <button
            type="button"
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: '0.6',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v8"></path>
              <path d="M8 12h8"></path>
            </svg>
          </button>
        </div>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #372163 0%, #5a3cc0 100%)',
            color: 'white',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(55, 33, 99, 0.2)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(55, 33, 99, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 3px 10px rgba(55, 33, 99, 0.2)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 