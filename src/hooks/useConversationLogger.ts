import { useState, useEffect, useCallback } from 'react';
import ConversationLogger, { LoggedMessage, ConversationLog } from '../utils/ConversationLogger';

interface UseConversationLoggerProps {
  agentId: string;
  agentName: string;
  agentRole: string;
}

interface UseConversationLoggerResult {
  conversationId: string | null;
  logUserMessage: (text: string) => void;
  logAgentMessage: (text: string) => void;
  endConversation: () => ConversationLog | null;
  messages: LoggedMessage[];
}

const useConversationLogger = (
  { agentId, agentName, agentRole }: UseConversationLoggerProps
): UseConversationLoggerResult => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<LoggedMessage[]>([]);
  
  // Start a new conversation when the hook is initialized
  useEffect(() => {
    const id = ConversationLogger.startConversation(agentId, agentName, agentRole);
    setConversationId(id);
    
    // When component unmounts, end the conversation if it hasn't been explicitly ended
    return () => {
      if (conversationId) {
        ConversationLogger.endConversation(conversationId);
      }
    };
  }, [agentId, agentName, agentRole]);
  
  // Keep local messages in sync with the conversation logger
  useEffect(() => {
    if (!conversationId) return;
    
    const conversation = ConversationLogger.getConversation(conversationId);
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversationId]);
  
  // Log a user message
  const logUserMessage = useCallback((text: string) => {
    if (!conversationId) return;
    
    const message = {
      text,
      sender: 'user' as const,
      timestamp: new Date().toISOString()
    };
    
    ConversationLogger.logMessage(conversationId, message);
    
    // Update local messages
    const conversation = ConversationLogger.getConversation(conversationId);
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversationId]);
  
  // Log an agent message
  const logAgentMessage = useCallback((text: string) => {
    if (!conversationId) return;
    
    const message = {
      text,
      sender: 'agent' as const,
      timestamp: new Date().toISOString()
    };
    
    ConversationLogger.logMessage(conversationId, message);
    
    // Update local messages
    const conversation = ConversationLogger.getConversation(conversationId);
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversationId]);
  
  // End the conversation
  const endConversation = useCallback(() => {
    if (!conversationId) return null;
    
    const endedConversation = ConversationLogger.endConversation(conversationId);
    setConversationId(null);
    
    return endedConversation;
  }, [conversationId]);
  
  return {
    conversationId,
    logUserMessage,
    logAgentMessage,
    endConversation,
    messages
  };
};

export default useConversationLogger; 