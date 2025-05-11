import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  customerName: string;
  loyaltyTier?: string;
  loyaltyPoints?: number;
  avatarUrl?: string;
  onlineStatus?: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  customerName,
  loyaltyTier,
  loyaltyPoints,
  avatarUrl,
  onlineStatus = 'offline',
  lastSeen = '2 hours ago'
}) => {
  const navigate = useNavigate();

  const getStatusColor = () => {
    switch (onlineStatus) {
      case 'online': return '#4caf50';
      case 'away': return '#ff9800';
      case 'offline': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getLoyaltyColor = () => {
    switch (loyaltyTier?.toLowerCase()) {
      case 'platinum': return 'linear-gradient(135deg, #e5c590 0%, #a67c00 100%)';
      case 'gold': return 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)';
      case 'silver': return 'linear-gradient(135deg, #c0c0c0 0%, #a9a9a9 100%)';
      case 'bronze': return 'linear-gradient(135deg, #cd7f32 0%, #a0522d 100%)';
      default: return '#e0e0e0';
    }
  };

  const formatPoints = (points?: number) => {
    if (!points) return '';
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div style={{
      padding: '15px 25px',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#e1e1e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 600,
            color: '#5a3cc0',
            border: '2px solid #fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={customerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              customerName.charAt(0).toUpperCase()
            )}
          </div>
          {onlineStatus && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: getStatusColor(),
              border: '2px solid #fff'
            }} />
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{customerName}</h3>
            {loyaltyTier && (
              <div style={{
                background: getLoyaltyColor(),
                color: 'white',
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {loyaltyTier}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
            {loyaltyPoints !== undefined && (
              <div style={{ 
                fontSize: '12px', 
                color: '#888',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
                {formatPoints(loyaltyPoints)} points
              </div>
            )}
            <span style={{ fontSize: '5px', color: '#ccc' }}>•</span>
            <div style={{ fontSize: '12px', color: '#888' }}>
              {onlineStatus === 'online' ? 'Online' : `Last seen ${lastSeen}`}
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3c5.5 0 10 4.5 10 10s-4.5 10-10 10c-2.5 0-4.9-.8-6.9-2.4L3 22l1.3-3.9C2.8 16.1 2 13.7 2 11.2 2 5.6 6.5 3 12 3z"/>
          </svg>
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader; 