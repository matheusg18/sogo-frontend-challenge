import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import RegisterContract from './pages/RegisterContract';
import RegisterPerson from './pages/RegisterPerson';
import './App.styles.scss';
import ContractsToExpire from './pages/ContractsToExpire';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register">
          <Route path="person" element={<RegisterPerson />} />
          <Route path="contract" element={<RegisterContract />} />
        </Route>
        <Route path="contracts/to-expire" element={<ContractsToExpire />} />
      </Routes>
    </div>
  );
}

export default App;
