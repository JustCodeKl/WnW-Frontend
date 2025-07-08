/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [logout, setLogout] = useState(false);
  const [redirect, setRedirect] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [addedPlacesList, setAddedPlacesList] = useState([]);
  const [filterPlaces, setFilterPlaces] = useState("");
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    if (logout) {
      console.log("User sets to null");
    }
    setUsersList(users?.usersList);
    if (user) {
      axios.get("/user-places").then((response) => {
        setAddedPlacesList(response.data);
      });
    }
  }, [logout, usersList]);

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        setLogout,
        redirect,
        setRedirect,
        usersList,
        addedPlacesList,
        filterPlaces,
        setFilterPlaces,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
