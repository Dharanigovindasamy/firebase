import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminForm from './components/AdminForm/AdminForm';
import DomainForm from './components/DomainForm/DomainForm';
// import DeviceConfigForm from './components/DeviceConfigForm/DeviceConfigForm';
import './App.css';
import NavBar from './layout/NavBar';
import SideBar from './layout/SideBar';
import BasicDetails from './components/DeviceConfigForm/tabs/BasicDetails';
import DeviceConfiguration from './components/DeviceConfigForm/tabs/DeviceConfiguration';
import AdvancedConfiguration from './components/DeviceConfigForm/tabs/AdvancedConfiguration';

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
              <Route path="/device-config">
                <Route index element={<BasicDetails />} />
                <Route path="basic-details" element={<BasicDetails />} />
                <Route path="device-configuration" element={<DeviceConfiguration />} />
                <Route path="advanced-configuration" element={<AdvancedConfiguration />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
