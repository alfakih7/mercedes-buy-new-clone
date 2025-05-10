import React from 'react';

const AdminDashboard = () => {
  // Placeholder stats
  const stats = [
    { label: 'Cars Sold', value: 24 },
    { label: 'Total Leads', value: 120 },
    { label: 'Conversion Rate', value: '20%' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', padding: '2rem' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: '#888', fontSize: 16 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', color: '#aaa' }}>
          <p>Recent conversations and insights will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 