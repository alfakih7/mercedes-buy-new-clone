'use client'
import React, { useEffect } from 'react';

// Interface for custom window to access Vapi
declare global {
  interface Window {
    vapiInstance: any;
    vapiSDK: any;
  }
}

// This component loads the Vapi virtual assistant
export function VapiAssistant() {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.innerHTML = `
      var vapiInstance = null;
      const assistant = "98b24b97-b5ef-4342-b6b2-0a91353f3df1"; // Replace with your assistant ID
      const apiKey = "2a5e8d67-ddca-41b6-882d-89e4b81cf5cd"; // Replace with your Public key from Vapi Dashboard
      const buttonConfig = {}; // Customize this as needed

      (function (d, t) {
        var g = document.createElement(t),
          s = d.getElementsByTagName(t)[0];
        g.src =
          "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);

        g.onload = function () {
          vapiInstance = window.vapiSDK.run({
            apiKey: apiKey,
            assistant: assistant,
            config: buttonConfig
          });
        };
      })(document, "script");
    `;
    
    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
      if (window.vapiInstance) {
        // Add any cleanup code for Vapi if available
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}

export default VapiAssistant; 