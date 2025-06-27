import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Redirector from './pages/Redirector';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortCode" element={<Redirector />} />
    </Routes>
  </BrowserRouter>
);

export default App;
