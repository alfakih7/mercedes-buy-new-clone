import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Add email modal states
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: ""
  });
  
  // Email template states
  const [emailTemplate, setEmailTemplate] = useState("follow-up");
  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState(false);
  
  // Modify email modal states to include a crafting state
  const [isCraftingEmail, setIsCraftingEmail] = useState(false);
  
  // Add a state to track the email creation step
  const [emailStep, setEmailStep] = useState(1); // 1: Select Purpose, 2: Edit Email
  
  // Helper functions for styling
  const getInteractionTypeColor = (type: string) => {
    switch(type) {
      case "Showroom Visit": return "#e8f5e9";  // Light green
      case "Test Drive": return "#e3f2fd";      // Light blue
      case "Phone Call": return "#fff3e0";      // Light orange
      default: return "#f5f5f5";                // Light grey
    }
  };
  
  const getInteractionTypeTextColor = (type: string) => {
    switch(type) {
      case "Showroom Visit": return "#2e7d32";  // Dark green
      case "Test Drive": return "#1565c0";      // Dark blue
      case "Phone Call": return "#e65100";      // Dark orange
      default: return "#616161";                // Dark grey
    }
  };
  
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "#4caf50";  // Green
    if (rating >= 3.5) return "#8bc34a";  // Light Green
    if (rating >= 2.5) return "#ffc107";  // Amber
    if (rating >= 1.5) return "#ff9800";  // Orange
    return "#f44336";                     // Red
  };

  // Initial state with empty summary
  const [userData, setUserData] = useState({
    id: "AM001",
    name: "Ahmed Al Mansouri",
    email: "ahmed.almansouri@example.com",
    phone: "+971 50 123 4567",
    photo: "/src/ahmed_almansori.png", // Updated to use the Ahmed Al Mansouri image
    membership: "Platinum",
    joinDate: "March 15, 2020",
    carPreferences: {
      preferredBrands: ["Mercedes-Benz", "Alfa Romeo"],
      preferredModels: ["S-Class", "GLE Coupe", "Stelvio"],
      preferredColors: ["Black", "Graphite Grey"],
      preferredFeatures: ["Sports Package", "Premium Sound System", "Advanced Driver Assistance"]
    },
    interactionHistory: [
      { date: "2023-11-05", type: "Showroom Visit", notes: "Inquired about the new S-Class", staff: "Rashed Khalifa" },
      { date: "2023-09-22", type: "Test Drive", notes: "Test drove the GLE 53 AMG", staff: "Mariam Ahmed" },
      { date: "2023-08-15", type: "Phone Call", notes: "Discussed financing options", staff: "Yousef Al Hashemi" }
    ],
    purchaseHistory: [
      { date: "2023-03-21", model: "Mercedes-Benz S 450", price: "AED 525,000", details: "Anthracite Blue, Executive Line & Technology Packages" },
      { date: "2020-06-12", model: "Mercedes-Benz GLC 300", price: "AED 245,000", details: "Selenite Grey, Exclusive Package" }
    ],
    serviceHistory: [
      { date: "2023-10-10", type: "Regular Maintenance", details: "30,000 km service, brake fluid change", cost: "AED 3,200" },
      { date: "2023-06-05", type: "Regular Maintenance", details: "20,000 km service", cost: "AED 2,800" },
      { date: "2022-12-12", type: "Repair", details: "Front bumper repair after minor collision", cost: "AED 5,500" }
    ],
    feedback: [
      { date: "2023-10-12", type: "Service Feedback", rating: 4.8, comment: "Excellent service experience, very professional staff" },
      { date: "2022-05-02", type: "Purchase Feedback", rating: 4.5, comment: "Smooth purchase process but waiting time was a bit long" }
    ],
    interactionSummary: {
      summary: "",
      next_actions: []
    }
  });

  // Email input handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Move to next email step after selecting purpose
  const proceedToEmailComposition = () => {
    console.log("proceedToEmailComposition called with template:", emailTemplate);
    // Always clear any previous errors
    setError(null);
    
    // For all templates, directly call the craftEmail function
    craftEmail();
  };

  // Modify the craftEmail function to work for all email purposes
  const craftEmail = async () => {
    console.log("craftEmail function called, template:", emailTemplate);
    setIsCraftingEmail(true);
    setError(null); // Reset any previous errors
    
    try {
      // 1. Fetch the conversation data
      console.log("Fetching conversation data...");
      // Try different paths to find the conversation data file
      let response;
      let conversationText = "";
      
      try {
        // First try the original path
        response = await fetch('/src/AM001-no.txt');
        if (response.ok) {
          conversationText = await response.text();
          console.log("Conversation data fetched from /src/AM001-no.txt, length:", conversationText.length);
        }
      } catch (fetchError) {
        console.warn("Failed to fetch from first path:", fetchError);
      }
      
      // If first attempt failed, try an alternative path
      if (!conversationText) {
        try {
          response = await fetch('/AM001-no.txt');
          if (response.ok) {
            conversationText = await response.text();
            console.log("Conversation data fetched from /AM001-no.txt, length:", conversationText.length);
          }
        } catch (fetchError) {
          console.warn("Failed to fetch from second path:", fetchError);
        }
      }
      
      // If we still don't have the data, use a fallback
      if (!conversationText) {
        console.warn("Could not fetch conversation data, using fallback");
        conversationText = "Customer showed interest in Mercedes-Benz S-Class during a showroom visit on November 5, 2023.";
      }
      
      // Get the current email purpose in a readable format
      let purposeDescription = "follow-up";
      switch(emailTemplate) {
        case "follow-up": purposeDescription = "follow up on their recent interest"; break;
        case "promote": purposeDescription = "promote new vehicles matching their preferences"; break;
        case "service-reminder": purposeDescription = "remind about vehicle service"; break;
        case "event-invitation": purposeDescription = "invite to an exclusive showroom event"; break;
        case "feedback-request": purposeDescription = "request feedback on their recent experience"; break;
      }
      
      // 2. Call OpenAI API with prompt tailored for email generation and selected purpose
      console.log("Calling OpenAI API for", purposeDescription);
      const apiKey = "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";
      
      const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { 
              role: "system", 
              content: "You are an expert email composer for a luxury car dealership. You craft personalized, professional emails for high-value customers based on their profile and conversation history." 
            },
            { 
              role: "user", 
              content: `Craft a personalized email to ${purposeDescription} for this customer based on their profile and conversation history.

The email should be professional, warm, and specifically tailored to their preferences and recent interactions. The email's purpose is to: ${purposeDescription}.

CUSTOMER PROFILE:
Name: ${userData.name}
Membership: ${userData.membership}
Preferences: ${JSON.stringify(userData.carPreferences)}
Recent Interactions: ${JSON.stringify(userData.interactionHistory)}
Purchase History: ${JSON.stringify(userData.purchaseHistory)}

CONVERSATION HISTORY:
${conversationText}

Return your response in the following JSON format:
{
  "subject": "An engaging, specific email subject line",
  "body": "The full email body with greeting and signature"
}` 
            }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      console.log("API response status:", apiResponse.status);

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => null);
        console.error("API error data:", errorData);
        throw new Error(`API Error (${apiResponse.status}): ${errorData?.error?.message || 'Failed to get response from AI'}`);
      }

      const data = await apiResponse.json();
      console.log("API response received:", data.choices ? data.choices.length : "no choices");
      
      if (!data || !data.choices || data.choices.length === 0) {
        throw new Error('Invalid response from AI: empty or missing content');
      }
      
      // Parse the JSON response from the content field
      let result;
      try {
        result = JSON.parse(data.choices[0].message.content);
        console.log("Parsed result:", result);
        
        if (!result.subject || !result.body) {
          throw new Error('AI response missing required subject or body fields');
        }
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        throw new Error('Failed to parse AI response: invalid format');
      }
      
      // 3. Update the email data with the generated content
      console.log("Updating email data with AI result");
      setEmailData(prev => ({
        ...prev,
        subject: result.subject,
        message: result.body
      }));
      
      // Move to the next step after content is generated
      console.log("Moving to step 2");
      setEmailStep(2);
      
    } catch (err: any) {
      console.error('Error generating email:', err);
      setError(`Error: ${err.message || 'Failed to generate AI email'}`);
      // Stay on the first step when there's an error
      setEmailStep(1);
    } finally {
      setIsCraftingEmail(false);
      console.log("craftEmail function completed");
    }
  };

  // Handle template selection change
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateType = e.target.value;
    setEmailTemplate(templateType);
  };

  const handleSendEmail = async () => {
    // In a real application, you would integrate with an email API here
    // For demo purposes, we'll simulate sending with a timeout
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success state
      setEmailSent(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailSent(false);
        setEmailData({
          to: "",
          subject: "",
          message: ""
        });
        setEmailStep(1); // Reset to first step for next time
      }, 3000);
    } catch (err) {
      setError("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset email modal when closing
  const closeEmailModal = () => {
    setShowEmailModal(false);
    setEmailSent(false);
    setEmailStep(1); // Reset to first step
  };

  useEffect(() => {
    // Initialize email data when user data is available and email modal opens
    if (userData && userData.email && showEmailModal) {
      setEmailData(prev => ({
        ...prev,
        to: userData.email
      }));
    }
  }, [userData, showEmailModal]);

  useEffect(() => {
    // Only run for Ahmed Al Mansouri
    if (id !== 'AM001') return;

    const generateSummary = async () => {
      setIsLoading(true);
      
      try {
        // 1. Fetch the conversation data
        const response = await fetch('/src/AM001-no.txt');
        
        if (!response.ok) {
          throw new Error('Failed to fetch conversation data');
        }
        
        const conversationText = await response.text();
        
        // 2. Call OpenAI API
        const apiKey = "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";
        
        const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { 
                role: "system", 
                content: "You are a sales analysis assistant for a luxury car dealership. Extract key insights and next actions from customer conversations." 
              },
              { 
                role: "user", 
                content: `Review the following conversation history for the customer with the conversation below and provide:
1. A concise summary of the customer's interactions, preferences, and purchase decision journey
2. A list of 5 recommended next actions for the sales team

The summary should highlight key decision factors, price sensitivity, specific model preferences, and any special requirements.

CONVERSATION HISTORY:
${conversationText}

Return your response in the following JSON format:
{
  "summary": "Comprehensive but concise summary of the customer's interactions and preferences",
  "next_actions": ["Action 1", "Action 2", "Action 3", "Action 4", "Action 5"]
}` 
              }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
          })
        });

        if (!apiResponse.ok) {
          throw new Error(`OpenAI API error: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        // Parse the JSON response from the content field
        const result = JSON.parse(data.choices[0].message.content);
        
        // 3. Update the state once with the final result
        setUserData(prevData => ({
          ...prevData,
          interactionSummary: result
        }));
        
      } catch (err: any) {
        console.error('Error generating summary:', err);
        setError(`${err.message || 'Failed to generate AI summary'}`);
        // Don't set fallback summary, keep the error visible
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [id]); // Only depend on id

  return (
    <div style={{ 
      padding: "40px 50px", 
      maxWidth: "1400px", 
      margin: "0 auto", 
      backgroundColor: "#f5f7f9",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      color: "#333",
      minHeight: "100vh"
    }}>
      {/* Enhanced Header Section with improved styling */}
      <div style={{ 
        background: "linear-gradient(135deg, #372163 0%, #5a3cc0 100%)", 
        borderRadius: "20px", 
        padding: "40px",
        marginBottom: "30px",
        boxShadow: "0 10px 30px rgba(55, 33, 99, 0.2)",
        display: "flex",
        alignItems: "center",
        color: "white",
        transition: "all 0.3s ease",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <div style={{
          position: "relative",
          marginRight: "40px"
        }}>
          <img 
            src={userData.photo} 
            alt={userData.name} 
            style={{ 
              width: "140px", 
              height: "140px", 
              borderRadius: "50%", 
              objectFit: "cover",
              border: "5px solid rgba(255,255,255,0.7)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease",
            }} 
          />
          <div style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            background: "#1eb980",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            border: "3px solid white"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
        </div>
        
        <div style={{ marginLeft: "10px", flex: 1 }}>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "38px", fontWeight: "600", letterSpacing: "-0.5px" }}>{userData.name}</h1>
          <div style={{ display: "flex", gap: "20px", marginBottom: "16px", fontSize: "16px", opacity: 0.9 }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
                <path d="M22 2H2v16h16l4 4V2z"></path>
                <path d="M6 10h.01M12 10h.01M18 10h.01"></path>
              </svg>
              {userData.email}
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              {userData.phone}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
            <span style={{ 
              backgroundColor: "rgba(255,255,255,0.15)", 
              padding: "8px 16px", 
              borderRadius: "30px", 
              fontSize: "15px", 
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {userData.membership} Member
            </span>
            <span style={{ marginLeft: "20px", fontSize: "15px", opacity: 0.8, display: "flex", alignItems: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Member since: {userData.joinDate}
            </span>
          </div>
        </div>
        
        {/* Action buttons with improved styling */}
        <div style={{ display: "flex", gap: "15px" }}>
          <button 
            onClick={() => setShowEmailModal(true)}
            style={{ 
              background: "white", 
              color: "#372163", 
              border: "none", 
              padding: "14px 22px", 
              borderRadius: "12px", 
              fontWeight: "600", 
              display: "flex", 
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
              transition: "all 0.2s ease",
              fontSize: "15px"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "10px" }}>
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            AI Email Crafter
          </button>
          
          <button style={{ 
            background: "rgba(255,255,255,0.12)", 
            color: "white", 
            border: "1px solid rgba(255,255,255,0.3)", 
            padding: "14px 22px", 
            borderRadius: "12px", 
            fontWeight: "600", 
            display: "flex", 
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontSize: "15px",
            backdropFilter: "blur(5px)"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "10px" }}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Schedule Call
          </button>
        </div>
      </div>
      
      {/* Status banner with enhanced styling */}
      <div style={{
        display: "flex",
        padding: "25px 35px",
        background: "linear-gradient(to right, #e6f7ee, #edfaf2)",
        borderRadius: "18px",
        alignItems: "center",
        marginBottom: "40px",
        boxShadow: "0 10px 25px rgba(30, 185, 128, 0.15)",
        border: "1px solid rgba(30, 185, 128, 0.2)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(30, 185, 128, 0.15) 0%, rgba(30, 185, 128, 0) 70%)",
          borderRadius: "50%",
          transform: "translate(30%, -30%)"
        }}></div>
        
        <div style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#1eb980",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(30, 185, 128, 0.3)",
          marginRight: "25px"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="8"></circle>
            <path d="M3.05 11a9 9 0 0 1 .5-3.55"></path>
            <path d="M12 2.05V4"></path>
            <path d="M14.5 2.5l-1 1.5"></path>
            <path d="M9.5 2.5l1 1.5"></path>
            <path d="M16.24 7.76l1.26-1.26"></path>
            <path d="M19.95 11h-2"></path>
            <polyline points="12 12 12 16 16 16"></polyline>
          </svg>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "700", color: "#0e9662", marginLeft: "0", fontSize: "18px", marginBottom: "4px" }}>
            Test Drive Scheduled
          </div>
          <div style={{ color: "#338f68", fontSize: "15px" }}>
            Mercedes-Benz S-Class - Next Thursday at 4:00 PM
          </div>
        </div>
        
        <button style={{ 
          marginLeft: "auto", 
          background: "white", 
          border: "1px solid #1eb980", 
          color: "#1eb980", 
          padding: "12px 20px", 
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
          boxShadow: "0 6px 15px rgba(30, 185, 128, 0.15)",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          zIndex: 2
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Update Status
        </button>
      </div>
      
      {/* Email Modal - Updated to include step-based approach and error display */}
      {showEmailModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "600px",
            maxWidth: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "25px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <h2 style={{ margin: 0, color: "#372163" }}>
                {emailSent ? "Email Sent Successfully!" : (
                  emailStep === 1 ? "Select Email Purpose" : "Compose Email"
                )}
              </h2>
              <button 
                onClick={closeEmailModal}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "22px",
                  color: "#666"
                }}
              >
                ×
              </button>
            </div>
            
            {emailSent ? (
              <div style={{
                textAlign: "center",
                padding: "30px 0",
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto 20px",
                  backgroundColor: "#e6f7ee",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1eb980" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <p style={{ fontSize: "18px", color: "#1eb980", marginBottom: "5px" }}>
                  Email sent successfully!
                </p>
                <p style={{ color: "#666" }}>
                  Your follow-up email has been sent to {userData.name}
                </p>
              </div>
            ) : (
              <>
                {/* Display error message if there's an error */}
                {error && (
                  <div style={{ 
                    padding: "12px 15px", 
                    backgroundColor: "#ffebee", 
                    color: "#d32f2f", 
                    borderRadius: "6px", 
                    marginBottom: "20px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {error}
                  </div>
                )}
              
                {emailStep === 1 ? (
                  // Step 1: Email Purpose Selection
                  <div>
                    <div style={{ 
                      marginBottom: "25px", 
                      backgroundColor: "#f8f5ff", 
                      padding: "20px", 
                      borderRadius: "8px",
                      border: "1px solid #e8e0ff"
                    }}>
                      <label style={{ 
                        display: "block", 
                        marginBottom: "15px", 
                        fontWeight: "600", 
                        color: "#372163",
                        fontSize: "18px" 
                      }}>
                        Choose Email Purpose:
                      </label>
                      <div style={{ marginBottom: "20px" }}>
                        <select
                          value={emailTemplate}
                          onChange={handleTemplateChange}
                          style={{
                            width: "100%",
                            padding: "15px",
                            borderRadius: "6px",
                            border: "1px solid #d0c5f0",
                            fontSize: "16px",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                          }}
                          disabled={isCraftingEmail}
                        >
                          <option value="follow-up">Follow-up Email</option>
                          <option value="promote">Promotional Offer</option>
                          <option value="service-reminder">Service Reminder</option>
                          <option value="event-invitation">Event Invitation</option>
                          <option value="feedback-request">Feedback Request</option>
                        </select>
                      </div>
                      
                      <div style={{ 
                        fontSize: "14px", 
                        color: "#666", 
                        marginBottom: "20px",
                        fontStyle: "italic",
                        lineHeight: "1.5"
                      }}>
                        Select an email purpose and AI will create a personalized email based on the customer profile and conversation history
                      </div>
                      
                      <button
                        onClick={proceedToEmailComposition}
                        disabled={isCraftingEmail}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          padding: "15px",
                          borderRadius: "6px",
                          fontWeight: "600",
                          fontSize: "16px",
                          border: "none",
                          backgroundColor: "#372163",
                          color: "white",
                          cursor: isCraftingEmail ? "default" : "pointer",
                          opacity: isCraftingEmail ? 0.7 : 1
                        }}
                      >
                        {isCraftingEmail ? (
                          <>
                            <div style={{ 
                              width: "20px", 
                              height: "20px", 
                              borderRadius: "50%", 
                              border: "2px solid rgba(255,255,255,0.3)", 
                              borderTopColor: "white",
                              animation: "spin 1s linear infinite",
                              marginRight: "10px"
                            }} />
                            Crafting...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "10px" }}>
                              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                              <circle cx="11" cy="11" r="2"></circle>
                            </svg>
                            Craft Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Step 2: Email Composition Form
                  <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                        To:
                      </label>
                      <input
                        type="email"
                        name="to"
                        value={emailData.to}
                        onChange={handleEmailChange}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "6px",
                          border: "1px solid #ddd",
                          fontSize: "15px"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                        Subject:
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={emailData.subject}
                        onChange={handleEmailChange}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "6px",
                          border: "1px solid #ddd",
                          fontSize: "15px"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#444" }}>
                        Message:
                      </label>
                      <textarea
                        name="message"
                        value={emailData.message}
                        onChange={handleEmailChange}
                        rows={10}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "6px",
                          border: "1px solid #ddd",
                          fontSize: "15px",
                          resize: "vertical"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
                      <button
                        type="button"
                        onClick={() => setEmailStep(1)}
                        style={{
                          background: "#f0f0f0",
                          color: "#555",
                          border: "none",
                          padding: "12px 20px",
                          borderRadius: "6px",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
                          <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back
                      </button>
                      
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          onClick={closeEmailModal}
                          style={{
                            background: "#f0f0f0",
                            color: "#555",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "6px",
                            fontWeight: "500",
                            cursor: "pointer"
                          }}
                        >
                          Cancel
                        </button>
                        
                        <button
                          type="submit"
                          disabled={isLoading}
                          style={{
                            background: "#372163",
                            color: "white",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "6px",
                            fontWeight: "500",
                            cursor: isLoading ? "default" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            opacity: isLoading ? 0.7 : 1
                          }}
                        >
                          {isLoading ? (
                            <>
                              <div style={{ 
                                width: "16px", 
                                height: "16px", 
                                borderRadius: "50%", 
                                border: "2px solid rgba(255,255,255,0.3)", 
                                borderTopColor: "white",
                                animation: "spin 1s linear infinite",
                                marginRight: "10px"
                              }} />
                              Sending...
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                              </svg>
                              Send Email
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Rest of the content in more spacious grid layout */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(2, 1fr)", 
        gap: "40px",
        margin: "40px 0"
      }}>
        {/* Current Interests */}
        <div style={{ 
          background: "white", 
          borderRadius: "20px", 
          padding: "35px", 
          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(55, 33, 99, 0.04) 0%, rgba(55, 33, 99, 0) 70%)",
            borderRadius: "50%",
            transform: "translate(30%, 30%)"
          }}></div>
          
          <h2 style={{ 
            color: "#372163", 
            fontSize: "24px", 
            marginTop: "0", 
            marginBottom: "25px", 
            display: "flex", 
            alignItems: "center", 
            fontWeight: "700" 
          }}>
            <div style={{
              width: "45px",
              height: "45px",
              backgroundColor: "rgba(55, 33, 99, 0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px",
              boxShadow: "0 4px 10px rgba(55, 33, 99, 0.1)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            Current Interests
          </h2>
          
          <h3 style={{ fontSize: "18px", color: "#444", fontWeight: "600", marginBottom: "15px" }}>Preferred Brands</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "25px" }}>
            {userData.carPreferences.preferredBrands.map(brand => (
              <span key={brand} style={{ 
                background: "rgba(55, 33, 99, 0.05)", 
                padding: "10px 18px", 
                borderRadius: "30px", 
                fontSize: "15px",
                border: "1px solid rgba(55, 33, 99, 0.08)",
                fontWeight: "500",
                display: "flex",
                alignItems: "center"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px" }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                  <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                  <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                  <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                  <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                  <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                </svg>
                {brand}
              </span>
            ))}
          </div>
          
          <h3 style={{ fontSize: "18px", color: "#444", fontWeight: "600", marginBottom: "15px" }}>Preferred Models</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "25px" }}>
            {userData.carPreferences.preferredModels.map(model => (
              <span key={model} style={{ 
                background: "rgba(55, 33, 99, 0.05)", 
                padding: "10px 18px", 
                borderRadius: "30px", 
                fontSize: "15px",
                border: "1px solid rgba(55, 33, 99, 0.08)",
                fontWeight: "500",
                display: "flex",
                alignItems: "center"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px" }}>
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                {model}
              </span>
            ))}
          </div>
          
          <h3 style={{ fontSize: "18px", color: "#444", fontWeight: "600", marginBottom: "15px" }}>Preferred Features</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {userData.carPreferences.preferredFeatures.map(feature => (
              <span key={feature} style={{ 
                background: "rgba(55, 33, 99, 0.05)", 
                padding: "10px 18px", 
                borderRadius: "30px", 
                fontSize: "15px",
                border: "1px solid rgba(55, 33, 99, 0.08)",
                fontWeight: "500",
                display: "flex",
                alignItems: "center"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px" }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        {/* Interaction Summary */}
        <div style={{ 
          background: "white", 
          borderRadius: "20px", 
          padding: "35px", 
          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(55, 33, 99, 0.04) 0%, rgba(55, 33, 99, 0) 70%)",
            borderRadius: "50%",
            transform: "translate(30%, -30%)"
          }}></div>
          
          <h2 style={{ 
            color: "#372163", 
            fontSize: "24px", 
            marginTop: "0", 
            marginBottom: "25px", 
            display: "flex", 
            alignItems: "center", 
            fontWeight: "700" 
          }}>
            <div style={{
              width: "45px",
              height: "45px",
              backgroundColor: "rgba(55, 33, 99, 0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px",
              boxShadow: "0 4px 10px rgba(55, 33, 99, 0.1)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            Interaction Summary
            {isLoading && (
              <div style={{ 
                marginLeft: "10px", 
                fontSize: "14px", 
                color: "#666",
                display: "flex",
                alignItems: "center"
              }}>
                <div style={{ 
                  width: "18px", 
                  height: "18px", 
                  borderRadius: "50%", 
                  border: "2px solid rgba(55, 33, 99, 0.1)", 
                  borderTopColor: "#372163",
                  animation: "spin 1s linear infinite",
                  marginRight: "8px"
                }} />
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
                Analyzing...
              </div>
            )}
          </h2>
          
          {isLoading ? (
            <div style={{ 
              padding: "30px", 
              textAlign: "center", 
              color: "#666",
              backgroundColor: "#f9f9ff",
              borderRadius: "12px",
              border: "1px solid rgba(55, 33, 99, 0.08)"
            }}>
              <div style={{ 
                width: "40px", 
                height: "40px", 
                margin: "0 auto 15px",
                borderRadius: "50%", 
                border: "3px solid rgba(55, 33, 99, 0.1)", 
                borderTopColor: "#372163",
                animation: "spin 1s linear infinite" 
              }} />
              Analyzing customer interactions...
            </div>
          ) : error ? (
            <div style={{ 
              padding: "20px", 
              backgroundColor: "#ffebee", 
              color: "#d32f2f", 
              borderRadius: "12px", 
              border: "1px solid #ffcdd2",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <div>
                <div style={{ fontWeight: "600", marginBottom: "5px" }}>{error}</div>
                <div style={{ fontSize: "14px" }}>
                  Please try refreshing the page or contact support if the issue persists.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ 
                fontSize: "15px", 
                lineHeight: "1.6", 
                color: "#444", 
                backgroundColor: "#f9f9ff", 
                padding: "20px", 
                borderRadius: "12px", 
                border: "1px solid #eeeeff",
                marginBottom: "25px"
              }}>
                {userData.interactionSummary.summary}
              </div>
              
              {userData.interactionSummary.next_actions && userData.interactionSummary.next_actions.length > 0 && (
                <>
                  <h3 style={{ fontSize: "18px", color: "#372163", marginTop: "25px", marginBottom: "15px", display: "flex", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "10px" }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Next Actions
                  </h3>
                  <ul style={{ paddingLeft: "20px", marginTop: "0" }}>
                    {userData.interactionSummary.next_actions.map((action, index) => (
                      <li key={index} style={{ marginBottom: "12px", color: "#444", paddingLeft: "5px" }}>{action}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
        
        {/* Interaction History */}
        <div style={{ 
          background: "white", 
          borderRadius: "20px", 
          padding: "35px", 
          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          overflow: "hidden",
          marginTop: "40px"
        }}>
          <div style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(55, 33, 99, 0.04) 0%, rgba(55, 33, 99, 0) 70%)",
            borderRadius: "50%",
            transform: "translate(-30%, 30%)"
          }}></div>
          
          <h2 style={{ 
            color: "#372163", 
            fontSize: "24px", 
            marginTop: "0", 
            marginBottom: "25px", 
            display: "flex", 
            alignItems: "center", 
            fontWeight: "700" 
          }}>
            <div style={{
              width: "45px",
              height: "45px",
              backgroundColor: "rgba(55, 33, 99, 0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px",
              boxShadow: "0 4px 10px rgba(55, 33, 99, 0.1)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            Interaction History
          </h2>
          
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f5ff" }}>
                  <th style={{ textAlign: "left", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Date</th>
                  <th style={{ textAlign: "left", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Type</th>
                  <th style={{ textAlign: "left", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Notes</th>
                  <th style={{ textAlign: "left", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Staff</th>
                </tr>
              </thead>
              <tbody>
                {userData.interactionHistory.map((interaction, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#fcfcff" }}>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "15px" }}>
                      <div style={{ 
                        fontWeight: "500", 
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px", opacity: 0.7 }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {interaction.date}
                      </div>
                    </td>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "15px" }}>
                      <span style={{ 
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "6px 14px", 
                        backgroundColor: getInteractionTypeColor(interaction.type),
                        color: getInteractionTypeTextColor(interaction.type),
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500" 
                      }}>
                        {/* Different icon based on interaction type */}
                        {interaction.type === "Showroom Visit" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                          </svg>
                        )}
                        {interaction.type === "Test Drive" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                          </svg>
                        )}
                        {interaction.type === "Phone Call" && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        )}
                        {interaction.type}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "15px" }}>{interaction.notes}</td>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "15px" }}>
                      <div style={{ 
                        color: "#372163", 
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px", opacity: 0.7 }}>
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        {interaction.staff}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Purchase History */}
        <div style={{ 
          background: "white", 
          borderRadius: "20px", 
          padding: "35px", 
          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          overflow: "hidden",
          marginTop: "40px"
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "180px",
            height: "180px",
            background: "radial-gradient(circle, rgba(55, 33, 99, 0.04) 0%, rgba(55, 33, 99, 0) 70%)",
            borderRadius: "50%",
            transform: "translate(30%, -30%)"
          }}></div>
          
          <h2 style={{ 
            color: "#372163", 
            fontSize: "24px", 
            marginTop: "0", 
            marginBottom: "25px", 
            display: "flex", 
            alignItems: "center", 
            fontWeight: "700" 
          }}>
            <div style={{
              width: "45px",
              height: "45px",
              backgroundColor: "rgba(55, 33, 99, 0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px",
              boxShadow: "0 4px 10px rgba(55, 33, 99, 0.1)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            Purchase History
          </h2>
          
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f5ff" }}>
                  <th style={{ textAlign: "left", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Date</th>
                  <th style={{ textAlign: "left", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Model</th>
                  <th style={{ textAlign: "left", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Details</th>
                  <th style={{ textAlign: "right", padding: "16px 18px", color: "#555", fontWeight: "600", fontSize: "16px", borderBottom: "1px solid #eee" }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {userData.purchaseHistory.map((purchase, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#fcfcff" }}>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "15px" }}>
                      <div style={{ 
                        fontWeight: "500", 
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px", opacity: 0.7 }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {purchase.date}
                      </div>
                    </td>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "15px" }}>
                      <strong style={{ 
                        color: "#372163", 
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px", opacity: 0.7 }}>
                          <rect x="1" y="3" width="15" height="13"></rect>
                          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                          <circle cx="5.5" cy="18.5" r="2.5"></circle>
                          <circle cx="18.5" cy="18.5" r="2.5"></circle>
                        </svg>
                        {purchase.model}
                      </strong>
                    </td>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "15px" }}>{purchase.details}</td>
                    <td style={{ padding: "16px 18px", borderBottom: "1px solid #f0f0f7", fontSize: "16px", fontWeight: "bold", textAlign: "right", color: "#1eb980" }}>
                      <div style={{ 
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        width: "100%"
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1eb980" strokeWidth="2" style={{ marginRight: "8px" }}>
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        {purchase.price}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Service History */}
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "30px", 
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          gridColumn: "1 / span 2",
          marginTop: "20px"
        }}>
          <h2 style={{ color: "#372163", fontSize: "22px", marginTop: "0", marginBottom: "20px", display: "flex", alignItems: "center", fontWeight: "600" }}>
            <div style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(55, 33, 99, 0.08)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            Service History
          </h2>
          
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f5ff" }}>
                  <th style={{ textAlign: "left", padding: "14px 16px", color: "#555", fontWeight: "600", fontSize: "15px", borderBottom: "1px solid #eee" }}>Date</th>
                  <th style={{ textAlign: "left", padding: "14px 16px", color: "#555", fontWeight: "600", fontSize: "15px", borderBottom: "1px solid #eee" }}>Type</th>
                  <th style={{ textAlign: "left", padding: "14px 16px", color: "#555", fontWeight: "600", fontSize: "15px", borderBottom: "1px solid #eee" }}>Details</th>
                  <th style={{ textAlign: "right", padding: "14px 16px", color: "#555", fontWeight: "600", fontSize: "15px", borderBottom: "1px solid #eee" }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {userData.serviceHistory.map((service, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#fcfcff" }}>
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f7", fontSize: "14px" }}>{service.date}</td>
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f7", fontSize: "14px" }}>
                      <span style={{ 
                        display: "inline-block",
                        padding: "5px 12px", 
                        backgroundColor: service.type === "Repair" ? "#fff4e5" : "#e7f5ff",
                        color: service.type === "Repair" ? "#e67e22" : "#2196f3",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "500" 
                      }}>
                        {service.type}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f7", fontSize: "14px" }}>{service.details}</td>
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f7", fontSize: "15px", fontWeight: "bold", textAlign: "right", color: "#000" }}>{service.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Customer Feedback */}
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "30px", 
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.05)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          gridColumn: "1 / span 2",
          marginTop: "20px"
        }}>
          <h2 style={{ color: "#372163", fontSize: "22px", marginTop: "0", marginBottom: "20px", display: "flex", alignItems: "center", fontWeight: "600" }}>
            <div style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(55, 33, 99, 0.08)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            Customer Feedback
          </h2>
          
          {userData.feedback.map((item, index) => (
            <div key={index} style={{ 
              marginBottom: "20px", 
              borderBottom: index < userData.feedback.length - 1 ? "1px solid #f0f0f7" : "none", 
              paddingBottom: "20px",
              background: "#fafafa",
              padding: "20px",
              borderRadius: "12px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap" }}>
                <strong style={{ color: "#333", fontSize: "16px", display: "flex", alignItems: "center" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#372163" strokeWidth="2" style={{ marginRight: "8px" }}>
                    {item.type === "Service Feedback" ? 
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path> :
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    }
                  </svg>
                  {item.type} - {item.date}
                </strong>
                <div style={{ 
                  background: "#fff", 
                  padding: "6px 12px", 
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  border: "1px solid #eee"
                }}>
                  Rating: 
                  <span style={{ 
                    color: getRatingColor(item.rating), 
                    fontWeight: "bold", 
                    marginLeft: "6px",
                    display: "flex",
                    alignItems: "center" 
                  }}>
                    {item.rating}/5
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={getRatingColor(item.rating)} style={{ marginLeft: "4px" }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </span>
                </div>
              </div>
              <p style={{ 
                margin: "5px 0 0 0", 
                color: "#444", 
                fontSize: "14px", 
                lineHeight: "1.6",
                fontStyle: "italic",
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #f0f0f0"
              }}>"{item.comment}"</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced Back Button and Action Bar */}
      <div style={{ 
        marginTop: "40px", 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(to right, #ffffff, #f9f9ff)",
        padding: "25px 30px",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.05)"
      }}>
        <button 
          onClick={() => window.history.back()} 
          style={{ 
            background: "#f0f0f0", 
            color: "#333", 
            border: "none", 
            padding: "14px 24px", 
            borderRadius: "12px", 
            cursor: "pointer",
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            fontWeight: "500",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "10px" }}>
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
        
        <div style={{ display: "flex", gap: "15px" }}>
          <button style={{ 
            background: "#372163", 
            color: "white", 
            border: "none", 
            padding: "14px 24px", 
            borderRadius: "12px", 
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s ease",
            boxShadow: "0 6px 15px rgba(55, 33, 99, 0.2)"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Create Task
          </button>
          
          <button style={{ 
            background: "#1eb980", 
            color: "white", 
            border: "none", 
            padding: "14px 24px", 
            borderRadius: "12px", 
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s ease",
            boxShadow: "0 6px 15px rgba(30, 185, 128, 0.2)"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 