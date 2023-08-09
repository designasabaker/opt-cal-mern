import {useUser} from "../context/UserContext.jsx";
import { motion } from "framer-motion"
import {useNavigate} from "react-router-dom";

export function LoginBox(){
    const navigate = useNavigate ()
    const {err, banner, login, googleLogin, isLogining, setShowLogin, setShowRegister} = useUser();
    // const handleGoogleLoginSuccess = (tokenResponse) => {
    //     const accessToken = tokenResponse.access_token;
    // }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01]
        }}>
            <form
                className="loginForm"
                onSubmit={(e)=>{
                    e.preventDefault();
                    login(e.target.usernameOrEmail.value, e.target.password.value);
                }}
            >
                {isLogining && <div>Logging in...</div>}
                <label>
                    Username or Email:
                    <input type="text" name="usernameOrEmail" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <span className="link-sm"
                    onClick={()=>{
                        setShowLogin(false);
                        navigate('/forgot-password')
                    }}
                >Forget the password?</span>
                {banner && <span className="banner">{banner}</span>}
                {err && <span className="err">{err}</span>}
                <button type="submit" value="Submit" >login</button>
                <button type="button" onClick={()=>googleLogin()}>Sign in with Google</button>
                <hr />
                <div>
                    New user?
                    <span
                        className="link"
                        onClick={()=>{
                            setShowLogin(false);
                            setShowRegister(true);
                        }}>Register here</span>
                </div>
                <button onClick={()=>setShowLogin(false)}>Close</button>
            </form>
        </motion.div>
    )
}

export function RegisterBox(){
    const {err, register, setShowLogin, setShowRegister} = useUser();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01]
            }}>
            <form
                className="register-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    if(e.target.password.value !== e.target.confirmPassword.value){
                        console.error('Passwords do not match');
                        return;
                    }
                    register(e.target.username.value, e.target.password.value, e.target.email.value);
                }}
            >
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Email:  {/* Add a new field for email */}
                    <input type="email" name="email" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <label>
                    Confirm Password:
                    <input type="text" name="confirmPassword" />
                </label>
                {err && <span className="err">{err}</span>}
                <button type="submit" value="Submit" >Register</button>
                <hr />
                <div>
                    Already have an account?
                    <span
                        className="link"
                        onClick={()=>{
                            setShowLogin(true);
                            setShowRegister(false);
                        }}>Login here</span>
                </div>
                <div>
                    <button onClick={()=>setShowRegister(false)}>Close</button>
                </div>
            </form>

        </motion.div>
    )
}

export default LoginBox;