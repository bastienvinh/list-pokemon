import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.scss'
import Home from './pages/Home/Home.component'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
