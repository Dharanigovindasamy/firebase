// import React, { useEffect } from 'react';
// import './App.css';

// function App() {
//   useEffect(() => {
//     // Load Dialogflow Messenger script
//     const script = document.createElement("script");
//     script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
//     script.async = true;
//     document.body.appendChild(script);

//     // Auto open the chat after short delay
//     const openChat = () => {
//       const interval = setInterval(() => {
//         const messenger = document.querySelector("df-messenger");
//         if (messenger && messenger.shadowRoot) {
//           const icon = messenger.shadowRoot.querySelector("df-messenger-icon");
//           if (icon) {
//             icon.click();
//             clearInterval(interval);
//           }
//         }
//       }, 500);
//     };

//     setTimeout(openChat, 2000); 
//   }, []);

//   return (
//     <div className="App">
//       <h1>AI Daily Planner</h1>
//       <p>Our assistant will help schedule your day!</p>

//       {/* Dialogflow Messenger */}
//       <df-messenger
//         intent="WELCOME"
//         chat-title="PlannerBot"
//         agent-id="c11fbd7a-ac63-4aa0-98f1-dd02b6568838"
//         language-code="en"
//       ></df-messenger>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import ChatBot from './ChatBot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <div className="App">
      <h2 className="text-center mt-4">AI Daily Planner Chat</h2>
      <ChatBot />
    </div>
  );
}

export default App;
