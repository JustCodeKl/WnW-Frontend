import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/auth-slice";

export default function AccountPage(){

    const { logout, setLogout} = useContext(UserContext);
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth)

    async function logoutUser(){
        dispatch(logOutUser()).then(() =>
        setLogout(true))

    }

    if(!user) return 'Loading...';

    if(logout) { return < Navigate to={'/'} />};

    if(!user && !isAuthenticated) { return <Navigate to="/login" />; }

    return (
        <div className="">
            
            <NavBar />
                    <div className="text-center  max-w-lg mx-auto mt-4">
                        Logged as {user?.name} ({user?.email})
                        <br />
                        <button onClick={logoutUser} className="primary max-w-sm mt-4"> Logout </button>
                    </div>
        </div>
    )
}