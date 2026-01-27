import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/*" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
