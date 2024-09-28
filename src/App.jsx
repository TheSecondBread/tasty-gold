import { useState } from 'react'

import Qr from './Qr'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Qr></Qr>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
