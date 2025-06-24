import Dashboard from './components/Dashboard'
import DashboardContextProvider from './context/DashboardContext'
function App() {


  return (
    <DashboardContextProvider>
      <Dashboard />
    </DashboardContextProvider>
  )
}

export default App
