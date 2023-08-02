import UnemploymentCalculator from './components/UnemploymentCalculator'
import './App.css'
import {UserProvider} from './context/UserContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <UserProvider>
        <Navbar />
        <UnemploymentCalculator />
        <Footer />
    </UserProvider>
  )
}

export default App
