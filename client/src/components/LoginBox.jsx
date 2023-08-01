import {useUser} from "../context/UserContext.jsx";

export function LoginBox(){
    const {login, setShowLogin, setShowRegister} = useUser();
    return (
        <div className="loginBox">
            <form
                onSubmit={(e)=>{
                    e.preventDefault();
                    login(e.target.username.value, e.target.password.value);
                }}
            >
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>
                New user? <span onClick={()=>{
                    setShowLogin(false);
                    setShowRegister(true);
                }}>Register here</span>
            </div>
            <div>
                <button onClick={()=>setShowLogin(false)}>Close</button>
            </div>
        </div>
    )
}

export function RegisterBox(){
    const {register, setShowLogin, setShowRegister} = useUser();
    return (
        <div className="registerBox">
            <form
                onSubmit={(e)=>{
                    e.preventDefault();
                    if(e.target.password.value !== e.target.confirmPassword.value){
                        console.error('Passwords do not match');
                        return;
                    }
                    register(e.target.username.value, e.target.password.value);
                }}
            >
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" />
                </label>
                <label>
                    Confirm Password:
                    <input type="text" name="confirmPassword" />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>
                Already have an account?
                <span onClick={()=>{
                    setShowLogin(true);
                    setShowRegister(false);
                }}>Login here</span>
            </div>
            <div>
                <button onClick={()=>setShowRegister(false)}>Close</button>
            </div>
        </div>
    )
}

export default LoginBox;