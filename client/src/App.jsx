import UnemploymentCalculator from './components/UnemploymentCalculator'
import './App.css'
import {UserProvider} from './context/UserContext'
import {LanguageProvider} from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <UserProvider>
        <LanguageProvider>
            <Navbar />
            <UnemploymentCalculator />
            <Footer />
        </LanguageProvider>
    </UserProvider>
  )
}

export default App
