import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainRunner from './MainRunner.js';
import PrivacyPolicy from './PrivacyPolicy.js';

function App() {
  return (
    <>
    <Routes>
          <Route path="" element={<MainRunner />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
       </Routes>
    </>
  )
}

export default App
