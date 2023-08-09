import './App.css'
import {UserProvider} from './context/UserContext'
import {LanguageProvider} from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPasswordInstructions from "./pages/ResetPasswordInstructions.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <UserProvider>
        <LanguageProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password-instructions" element={<ResetPasswordInstructions />} />
                    <Route path="/reset-password">
                        <Route index element={<ResetPasswordInstructions />} />
                        <Route path=":token" element={<ResetPassword />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </LanguageProvider>
    </UserProvider>
  )
}

export default App
