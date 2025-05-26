import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminForm from './components/AdminForm/AdminForm';
import DomainForm from './components/DomainForm/DomainForm';
import DeviceConfigLayout from './components/DeviceConfigForm/DeviceConfigLayout';
import './App.css';
import NavBar from './layout/NavBar';
import SideBar from './layout/SideBar';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar/>
        <div className="content-wrapper">
          <SideBar/>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<h1>Welcome to dashboard</h1>} />
              <Route path="/admin" element={<AdminForm />} />
              <Route path="/domain" element={<DomainForm />} />
              <Route path="/device-config/*" element={<DeviceConfigLayout />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
