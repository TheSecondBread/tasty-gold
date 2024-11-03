import { useState } from 'react';

import Qr from './components/Qr';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Success from './Success';
import WinnersDashboard from './components/winners/WinnersDashboard';
import WinnersByWeeks from './components/winners/WinnersByWeeks';
import PrivacyPolicy from './components/PrivacyPolicy';
import ViewWinner from './components/winners/ViewWinner';
import WinnersTable from './components/winners/WinnersTable';
import TermsAndConditions from './components/TermsAndConditions';
import AlreadyRegistered from './AlreadyRegistered';
import Sidebar from './components/Sidebar';
import GenerateWinners from './components/winners/GenerateWinners';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qr" element={<Qr />} />
            <Route path="/winners-dashboard" element={<WinnersDashboard />} />
            <Route path="/winners-by-weeks" element={<WinnersByWeeks />} />
            <Route path="/winners" element={<WinnersTable />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/view-winner" element={<ViewWinner />} />
            <Route path="/success" element={<Success />} />
            <Route path="/already-registered" element={<AlreadyRegistered />} />
            <Route path="/generate-winners" element={<GenerateWinners />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
