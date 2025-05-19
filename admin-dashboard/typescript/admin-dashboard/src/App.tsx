import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DomainForm from "./components/DomainForm/DomainForm";
import NavBar from "./layout/NavBar";
import SideBar from "./layout/SideBar";
import './App.css';
import AdminForm from "./components/AdminForm/AdminForm";
import DeviceConfigForm from "./components/DeviceConfigForm/DeviceConfigForm";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div style={{ display: 'flex' }}>
          <SideBar />
          <main className="main-content">
            <Routes>
              <Route path="/admin" element={<AdminForm />} />
              <Route path="/domain" element={<DomainForm />} />
              <Route path="/device-config" element={<DeviceConfigForm/>} />
              <Route path="/" element={<h1>Welcome to Dashboard</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
