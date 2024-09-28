import { useState } from 'react'

import Qr from './Qr'
import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Success from './Success'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path='/qr' element={<Qr></Qr>}></Route>
      <Route path='/success' element={<Success></Success>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
