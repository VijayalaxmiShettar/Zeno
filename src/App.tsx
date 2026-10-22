import { Home } from './pages/home/Home'
import { Route, Routes } from 'react-router'
import Station from './pages/stations/Station'
import UsersTable from './pages/users/Users'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="stations" element={<Station />} />
        <Route path="users" element={<UsersTable />} />
      </Route>
    </Routes>
  )
}

export default App
