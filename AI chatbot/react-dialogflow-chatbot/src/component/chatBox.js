import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chatBox.css';

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hi! Let's create your personalized day plan. What time do you usually wake up?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);

    try {
      const res = await axios.post('http://localhost:5000/api/dialogflow/send', {
        userInput: input
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("res", res.data);
      setMessages(prev => [...prev, { text: res.data, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Sorry, I couldn't reach the assistant.", sender: 'bot' }]);
    }

    setInput('');
  };

  return (
    <div className="chat-widget">
      {!isOpen && (
        <button className="chat-widget-button" onClick={() => setIsOpen(true)}>
          <i className="fas fa-comments"></i>
          <span>Chat with us</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-container" ref={chatBoxRef}>
          <div className="chat-header">
            <div className="chat-header-info">
              <h3>PlannerBot</h3>
              <span className="status-dot"></span>
              <span className="status-text">Online</span>
            </div>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                <div className="message-content">
                  {msg.text}
                </div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
            />
            <button className="send-button" onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
