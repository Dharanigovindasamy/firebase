import React, { useState } from 'react';
import axios from 'axios';

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: 'Hi! I’m your PlannerBot. How can I help you?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to UI
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);

    try {
      const res = await axios.post('http://localhost:5000/api/dialogflow/send', input);
      setMessages(prev => [...prev, { text: res.data, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Sorry, I couldn't reach the assistant.", sender: 'bot' }]);
    }

    setInput('');
  };

  return (
    <div className="card p-3">
      <div className="chat-box mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`text-${msg.sender === 'user' ? 'end' : 'start'} mb-2`}>
            <span className={`badge bg-${msg.sender === 'user' ? 'primary' : 'secondary'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="btn btn-success" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
