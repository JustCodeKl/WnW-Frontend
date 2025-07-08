import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/auth-slice";

export default function RegisterPage(){

    const { usersList } = useContext(UserContext)
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [redirect, setRedirect] = useState(false);
    const emailList = usersList?.map(user => user.email)

    const dispatch = useDispatch();


   async function register(e){
        e.preventDefault();
        if(emailList?.includes(email)) alert("Please enter another E-mail");    
        if(password === repeat && !emailList?.includes(email)){
            try {
                dispatch(registerUser({name: userName, email, password})).then(() => {
                   alert('Registration was successful :). Try to login now');
                   setRedirect(true);})
                   
               } catch (er) {
                   alert('Registration failed :(');
                   console.error(er);
               }
        }
    }

    if(redirect) return < Navigate to='/login' />;

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-5xl text-center mb-4"> Register </h1>
                <form className="max-w-md mx-auto" onSubmit={register}>
                    <input type="text" name="" placeholder="your username" id="username" value={userName} onChange={e => setName(e.target.value)} required/>
                    <input type="email" name="" id="useremail" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" name="" placeholder="Enter your password here" id="userpassword" value={password} onChange={e => setPassword(e.target.value)} required/>
                    {
                        password !== repeat && (
                            <div className="text-red-500 text-sm" role="pass">
                                Passwords do not match!
                            </div>
                        )
                    }
                    <input type="password" name="" placeholder="Repeat your password here" id="passrepeat" value={repeat} onChange={e => setRepeat(e.target.value)} required/>
                    {
                        password !== repeat && (
                            <div className="text-red-500 text-sm mb-2" role="repeat-pass">
                                Passwords do not match
                            </div>
                        )
                    }
                    <button type="submit" className="primary">Register</button>
                    <div className="text-center mt-4 text-gray-500">
                        Already a member? <Link to="/login" className="text-primary underline"> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}