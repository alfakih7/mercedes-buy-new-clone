import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  lastContact: string;
  unreadMessages: number;
  loyaltyTier?: string;
  loyaltyPoints?: number;
  lastActive: string;
  avatar?: string;
}

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For this demo, we'll create mock data
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock customer data
        const mockCustomers: Customer[] = [
          {
            id: 'AM001',
            name: 'Ahmed Al Mansouri',
            email: 'ahmed.almansouri@example.com',
            phone: '+971 50 123 4567',
            photo: '/src/ahmed_almansori.png',
            lastContact: '2023-03-20',
            unreadMessages: 0,
            loyaltyTier: 'Platinum',
            loyaltyPoints: 12500,
            lastActive: '2 hours ago',
            avatar: '/src/ahmed_almansori.png'
          },
          {
            id: 'LK002',
            name: 'Layla Khan',
            email: 'layla.khan@example.com',
            phone: '+971 55 987 6543',
            lastContact: '2023-03-15',
            unreadMessages: 2,
            loyaltyTier: 'Gold',
            loyaltyPoints: 5600,
            lastActive: '1 day ago',
            avatar: '/src/layla_khan.png'
          },
          {
            id: 'RP003',
            name: 'Raj Patel',
            email: 'raj.patel@example.com',
            phone: '+971 52 456 7890',
            lastContact: '2023-03-10',
            unreadMessages: 0,
            loyaltyTier: 'Silver',
            loyaltyPoints: 2100,
            lastActive: '3 days ago',
            avatar: '/src/raj_patel.png'
          },
          {
            id: 'MAF004',
            name: 'Mohammed Al Farsi',
            email: 'mohammed.alfarsi@example.com',
            phone: '+971 54 321 9876',
            lastContact: '2023-03-05',
            unreadMessages: 5,
            loyaltyTier: 'Gold',
            loyaltyPoints: 8900,
            lastActive: '5 hours ago',
            avatar: '/src/mohammed_alfarsi.png'
          }
        ];
        
        setCustomers(mockCustomers);
        
        // If an ID is provided in the URL, select that customer
        if (id) {
          const customer = mockCustomers.find(c => c.id === id);
          if (customer) {
            setSelectedCustomer(customer);
          }
        } else if (mockCustomers.length > 0) {
          // Otherwise select the first customer
          setSelectedCustomer(mockCustomers[0]);
        }
        
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomers();
  }, [id]);
  
  useEffect(() => {
    // Check if a specific customer ID was passed in the URL
    const params = new URLSearchParams(location.search);
    const customerId = params.get('customer');
    
    if (customerId) {
      const customer = customers.find(c => c.id === customerId);
      if (customer) {
        setSelectedCustomer(customer);
      }
    }
  }, [location]);
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div style={{
      padding: '30px 40px',
      maxWidth: '1600px',
      margin: '0 auto',
      minHeight: '100vh',
      background: '#f5f7f9',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1 style={{ 
        color: '#372163',
        fontSize: '28px',
        marginBottom: '30px',
        fontWeight: '700'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '45px',
            height: '45px',
            backgroundColor: 'rgba(55, 33, 99, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '15px',
            boxShadow: '0 4px 10px rgba(55, 33, 99, 0.1)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          Customer Conversations
        </div>
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '30px',
        height: 'calc(100vh - 150px)',
        flexGrow: 1
      }}>
        {/* Customer list sidebar */}
        <div style={{
          width: '350px',
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div style={{ padding: '20px' }}>
            <div style={{ position: 'relative', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 20px 12px 40px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontSize: '14px',
                  background: '#f8f9fa'
                }}
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#999" 
                strokeWidth="2"
                style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          
          <div style={{ 
            flex: 1, 
            overflowY: 'auto',
            borderTop: '1px solid rgba(0,0,0,0.05)'
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
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No customers found
              </div>
            ) : (
              filteredCustomers.map(customer => (
                <div 
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    background: selectedCustomer?.id === customer.id ? 'rgba(90, 60, 192, 0.05)' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <div style={{ position: 'relative', marginRight: '15px' }}>
                    {customer.avatar ? (
                      <img 
                        src={customer.avatar} 
                        alt={customer.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#5a3cc0',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    {customer.unreadMessages > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#e53935',
                        color: 'white',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: '2px solid white'
                      }}>
                        {customer.unreadMessages}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '5px'
                    }}>
                      <h3 style={{ 
                        margin: 0, 
                        fontSize: '16px', 
                        fontWeight: '600',
                        color: selectedCustomer?.id === customer.id ? '#372163' : '#333'
                      }}>
                        {customer.name}
                      </h3>
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#999',
                        fontWeight: '500'
                      }}>
                        {formatDate(customer.lastContact)}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      {customer.phone}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Chat interface */}
        <div style={{ flex: 1 }}>
          {selectedCustomer ? (
            <ChatInterface 
              customerId={selectedCustomer.id}
              customerName={selectedCustomer.name}
              loyaltyTier={selectedCustomer.loyaltyTier}
              loyaltyPoints={selectedCustomer.loyaltyPoints}
            />
          ) : (
            <div style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ marginBottom: '20px', opacity: 0.7 }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '18px' }}>No Customer Selected</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>Select a customer from the list to view their conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 