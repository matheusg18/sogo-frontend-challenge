import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterPerson from './pages/RegisterPerson';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register">
        <Route path="person" element={<RegisterPerson />} />
      </Route>
    </Routes>
  );
}

export default App;
