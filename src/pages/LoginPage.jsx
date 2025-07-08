/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/auth-slice";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser, setLogout} = useContext(UserContext);
    const dispatch = useDispatch();

    async function handleLogin(ev){
        ev.preventDefault();
        try {
            const formData = {
                email: email,
                password: password
            }
             //const userResponse = await axios.post('/login', {email, password}, {withCredentials: true});  
             dispatch(loginUser(formData)).then(data => console.log(data))
            /*  if(userResponse.data?.responseStatus !== "Password not Ok" && userResponse.data?.responseStatus !== "User not found"){
                setUser((await userResponse).data);
                alert('Login successful');
                setLogout(false);
                setRedirect(true);
             }
             else alert('Login failed. ' + userResponse.data?.responseStatus); */
        } catch (error) {
            alert('Login failed :(');
            console.log(error);
        }
    }

    if(redirect) return < Navigate to='/' />

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-5xl text-center mb-4"> Login </h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <input type="email" name="" id="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" name="" placeholder="Enter your password here" id="password" value={password} onChange={e =>setPassword(e.target.value)}/>
                    <button type="submit" className="primary">Login</button>
                    <div className="text-center mt-4 text-gray-500">
                        Don't have an account yet? <Link to="/register" className="text-primary underline"> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}