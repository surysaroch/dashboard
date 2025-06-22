import Dashboard from './components/Dashboard'
import { useContext } from 'react'
import DashboardContextProvider from './context/DashboardContext'
function App() {


  return (
    <DashboardContextProvider>
      <Dashboard />
    </DashboardContextProvider>
  )
}

export default App
