
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Estimator from './pages/Estimator';
import Booking from './pages/Booking';
import Materials from './pages/Materials';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { StudioProvider } from './context/StudioContext';

const App: React.FC = () => {
  return (
    <StudioProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/estimator" element={<Estimator />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </StudioProvider>
  );
};

export default App;
