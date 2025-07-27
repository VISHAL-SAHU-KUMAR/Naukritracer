import { useEffect } from 'react';

export function ChatbotWidget() {
  useEffect(() => {
    // The script is already loaded in index.html
    // This component just ensures proper cleanup if needed
    
    return () => {
      // Cleanup function if needed
      const existingWidget = document.querySelector('#omnidimension-web-widget');
      if (existingWidget) {
        // Widget cleanup is handled by the external script
        console.log('Chatbot widget cleanup');
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}