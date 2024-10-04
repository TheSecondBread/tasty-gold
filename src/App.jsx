import { useState } from 'react'

import Qr from './components/Qr'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Success from './Success'
import WinnersDashboard from './components/winners/WinnersDashboard'
import WinnersByWeeks from './components/winners/WinnersByWeeks'
import PrivacyPolicy from './components/PrivacyPolicy'
import ViewWinner from './components/winners/ViewWinner'
import WinnersTable from './components/winners/WinnersTable'
import TermsAndConditions from './components/TermsAndConditions'
import AlreadyRegistered from './AlreadyRegistered'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path='/qr' element={<Qr></Qr>}></Route>
      <Route path='/winners-dashboard' element={<WinnersDashboard></WinnersDashboard>}></Route>
      <Route path='/winners-by-weeks' element={<WinnersByWeeks></WinnersByWeeks>}></Route>
      <Route path='/winners' element={<WinnersTable></WinnersTable>}></Route>
      <Route path='/privacy-policy' element={<PrivacyPolicy></PrivacyPolicy>}></Route>
      <Route path='/terms-and-conditions' element={<TermsAndConditions></TermsAndConditions>}></Route>

      <Route path='/view-winner' element={<ViewWinner></ViewWinner>}></Route>

      <Route path='/success' element={<Success></Success>}></Route>
      <Route path='/already-registered' element={<AlreadyRegistered></AlreadyRegistered>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
