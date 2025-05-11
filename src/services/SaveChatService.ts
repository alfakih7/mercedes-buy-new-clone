/**
 * Service to handle saving chat data to files
 */

interface Message {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  content: string;
  timestamp: string;
}

/**
 * Saves chat history to a file named chats.txt
 * @param messages Array of chat messages
 * @param customerName Name of the customer
 * @param customerId ID of the customer
 * @returns boolean indicating success of operation
 */
export const saveChatToFile = (
  messages: Message[],
  customerName: string,
  customerId: string
): boolean => {
  try {
    // Identify if there's a summary message at the end
    const hasSummary = messages.length > 0 && 
      messages[messages.length - 1].id === 'summary' &&
      messages[messages.length - 1].sender === 'system';
      
    let summaryContent = '';
    if (hasSummary) {
      // Extract and format the summary separately
      const summaryMessage = messages[messages.length - 1];
      summaryContent = `\n\n==========================================\n` +
                      `CONVERSATION SUMMARY\n` +
                      `==========================================\n` +
                      summaryMessage.content.replace('CONVERSATION SUMMARY:', '');
      
      // Remove summary from regular messages
      messages = messages.slice(0, messages.length - 1);
    }
    
    // Group messages by session (using system messages as session dividers)
    let currentSession = '';
    const sessionMessages: {[key: string]: Message[]} = {};
    
    messages.forEach(msg => {
      if (msg.sender === 'system' && msg.content.includes('(')) {
        // This looks like a session header
        currentSession = msg.content;
        if (!sessionMessages[currentSession]) {
          sessionMessages[currentSession] = [];
        }
      } else if (currentSession) {
        // Add to current session
        sessionMessages[currentSession].push(msg);
      }
    });
    
    // Format the chat data with better styling
    let chatData = '';
    
    // Format header
    chatData += `================================================================\n`;
    chatData += `CHAT HISTORY FOR: ${customerName.toUpperCase()} (ID: ${customerId})\n`;
    chatData += `EXPORTED: ${new Date().toLocaleString()}\n`;
    chatData += `================================================================\n\n`;
    
    // Format each session
    Object.entries(sessionMessages).forEach(([session, msgs]) => {
      chatData += `------------------\n`;
      chatData += `${session}\n`;
      chatData += `------------------\n\n`;
      
      msgs.forEach(msg => {
        const timestamp = formatTimestamp(msg.timestamp);
        const senderLabel = msg.sender === 'customer' ? 'CUSTOMER' : 
                            msg.sender === 'agent' ? 'AGENT' :
                            'SYSTEM';
        
        chatData += `[${timestamp}] ${senderLabel}:\n`;
        chatData += `${msg.content}\n\n`;
      });
      
      chatData += '\n';
    });
    
    // Add summary at the end if it exists
    if (summaryContent) {
      chatData += summaryContent;
    }
    
    // In a browser environment, create a download
    if (typeof window !== 'undefined') {
      const blob = new Blob([chatData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat_${customerId}_${new Date().toISOString().split('T')[0]}.txt`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
    
    console.log('Chat data saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving chat data:', error);
    return false;
  }
};

/**
 * Formats a timestamp for displaying in chat interface
 * @param timestamp ISO string timestamp
 * @returns Formatted date string
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export default {
  saveChatToFile,
  formatTimestamp
}; 