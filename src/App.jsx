import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import PlaceFormPage from "./pages/PlaceFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkProfile } from "./store/auth-slice";
import { getUsers } from "./store/users-slice";
/* import {disableReactDevTools} from '@fvilers/disable-react-devtools';
import process from 'process'; */

axios.defaults.baseURL = "https://wnw-api.onrender.com";
axios.defaults.withCredentials = true;

// if(process?.env?.NODE_ENV === 'production') disableReactDevTools();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkProfile());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/*<Route path='/account' element={<AccountPage />} />
          <Route path='/account/:subpage' element={<AccountPage />} />*/}
          <Route path="/account/profile" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlaceFormPage />} />
          <Route path="/account/places/:id" element={<PlaceFormPage />} />
          <Route path="/account/bookings/:action" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
