import { useState } from 'react'

import Qr from './components/Qr'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Success from './Success'
import WinnersDashboard from './components/WinnersDashboard'
import WinnersByWeeks from './components/WinnersByWeeks'
import Winners from './components/Winners'
import PrivacyPolicy from './components/PrivacyPolicy'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path='/qr' element={<Qr></Qr>}></Route>
      <Route path='/winnersdashboard' element={<WinnersDashboard></WinnersDashboard>}></Route>
      <Route path='/winnersbyweeks' element={<WinnersByWeeks></WinnersByWeeks>}></Route>
      <Route path='/winners' element={<Winners></Winners>}></Route>
      <Route path='/privacy-policy' element={<PrivacyPolicy></PrivacyPolicy>}></Route>
      
      <Route path='/success' element={<Success></Success>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
