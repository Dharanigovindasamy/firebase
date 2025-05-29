import React from 'react';
import ChatBox from './component/chatBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import chatImage from './assets/download.jpg'; 
import backgroundImage from './assets/chatimg.avif'; 

function App() {
  return (
    <div className="App">
      <h2 className="text-center mt-4">AI Daily Planner Chat</h2>
      <p className="text-center">Our assistant will help schedule your day!</p>
       <div className="text-center mb-4">
        <img src={backgroundImage}alt="PlannerBot Logo" className="img-fluid" />
      </div>  
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ChatBox />
          </div>
        </div>
      </div>
      {/* <ChatBox /> */}
    </div>
  );
}

export default App;
