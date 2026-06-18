import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Challenges from './pages/Challenges.jsx'
import Coach from './pages/Coach.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Home from './pages/Home.jsx'
import Simulator from './pages/Simulator.jsx'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="coach" element={<Coach />} />
        <Route path="simulator" element={<Simulator />} />
        <Route path="challenges" element={<Challenges />} />
      </Route>
    </Routes>
  )
}

export default App
