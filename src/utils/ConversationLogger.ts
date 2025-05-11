/**
 * Utility for logging conversations with AI agents
 */

export interface LoggedMessage {
  id: string;
  text: string; 
  sender: 'user' | 'agent';
  timestamp: string;
}

export interface ConversationLog {
  id: string;
  agentId: string;
  agentName: string;
  agentRole: string;
  startTime: string;
  endTime?: string;
  messages: LoggedMessage[];
}

class ConversationLogger {
  private static instance: ConversationLogger;
  private conversations: Record<string, ConversationLog> = {};
  
  private constructor() {
    // Load any existing conversations from localStorage
    try {
      const storedConversations = localStorage.getItem('gargash-agent-conversations');
      if (storedConversations) {
        this.conversations = JSON.parse(storedConversations);
      }
    } catch (error) {
      console.error('Failed to load conversations from localStorage', error);
    }
  }
  
  public static getInstance(): ConversationLogger {
    if (!ConversationLogger.instance) {
      ConversationLogger.instance = new ConversationLogger();
    }
    return ConversationLogger.instance;
  }
  
  /**
   * Start a new conversation with an agent
   */
  public startConversation(agentId: string, agentName: string, agentRole: string): string {
    const conversationId = `conversation-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    this.conversations[conversationId] = {
      id: conversationId,
      agentId,
      agentName,
      agentRole,
      startTime: new Date().toISOString(),
      messages: []
    };
    
    this.saveToStorage();
    return conversationId;
  }
  
  /**
   * Log a message in a conversation
   */
  public logMessage(conversationId: string, message: Omit<LoggedMessage, 'id'>): void {
    if (!this.conversations[conversationId]) {
      console.error(`Conversation with ID ${conversationId} not found`);
      return;
    }
    
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    };
    
    this.conversations[conversationId].messages.push(newMessage);
    this.saveToStorage();
  }
  
  /**
   * End a conversation and finalize the log
   */
  public endConversation(conversationId: string): ConversationLog | null {
    if (!this.conversations[conversationId]) {
      console.error(`Conversation with ID ${conversationId} not found`);
      return null;
    }
    
    this.conversations[conversationId].endTime = new Date().toISOString();
    this.saveToStorage();
    
    return this.conversations[conversationId];
  }
  
  /**
   * Get all logged conversations
   */
  public getConversations(): ConversationLog[] {
    return Object.values(this.conversations);
  }
  
  /**
   * Get a specific conversation by ID
   */
  public getConversation(conversationId: string): ConversationLog | null {
    return this.conversations[conversationId] || null;
  }
  
  /**
   * Save conversations to storage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem('gargash-agent-conversations', JSON.stringify(this.conversations));
    } catch (error) {
      console.error('Failed to save conversations to localStorage', error);
    }
  }
  
  /**
   * Export a conversation as JSON
   */
  public exportConversation(conversationId: string): string | null {
    const conversation = this.getConversation(conversationId);
    if (!conversation) return null;
    
    return JSON.stringify(conversation, null, 2);
  }
  
  /**
   * Export all conversations as JSON
   */
  public exportAllConversations(): string {
    return JSON.stringify(this.getConversations(), null, 2);
  }
  
  /**
   * Clear all logged conversations
   */
  public clearAllConversations(): void {
    this.conversations = {};
    this.saveToStorage();
  }
}

export default ConversationLogger.getInstance(); 