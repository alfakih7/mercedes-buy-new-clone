import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InteractionSummaryAgent = ({ customerID, onSummaryGenerated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateSummary = async () => {
      if (!customerID) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // First, fetch the customer interaction data
        const response = await axios.get(`/api/customer-data/${customerID}`);
        const customerData = response.data;
        
        // Then, use OpenAI to generate a summary
        const openAIResponse = await axios.post('/api/generate-summary', {
          customerData,
          customerID
        });
        
        const summary = openAIResponse.data;
        
        // Call the callback with the generated summary
        onSummaryGenerated(summary);
        
      } catch (err) {
        console.error('Error generating summary:', err);
        setError('Failed to generate customer interaction summary');
      } finally {
        setIsLoading(false);
      }
    };
    
    generateSummary();
  }, [customerID, onSummaryGenerated]);
  
  // This component doesn't render anything visible
  return (
    <>
      {isLoading && <div className="hidden">Generating summary...</div>}
      {error && <div className="hidden">Error: {error}</div>}
    </>
  );
};

export default InteractionSummaryAgent; 