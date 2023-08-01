import UnemploymentCalculator from './components/UnemploymentCalculator'
import './App.css'
import {UserProvider} from './context/UserContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <UserProvider>
        <Navbar />
        <UnemploymentCalculator />
    </UserProvider>
  )
}

export default App
