import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { fadeIn } from "react-animations";
//import styled, { keyframes } from "styled-components";
import { UserContext } from "../UserContext";
import '../style/MaintenancePage.css';

export default function IndexPage(){
    const [allPlaces, setAllPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places')
            .then(response => {
                setAllPlaces(response.data)
            })
    }, []);

    const {filterPlaces} = useContext(UserContext);

    let filterPlaceArray = allPlaces.filter((place) => 
        place.address.split(', ').pop().startsWith(filterPlaces));
    console.log(filterPlaceArray)

    // const Bounce = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

    return (
        <>  
            <div className="grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-10 max-sm:mt-6 gap-x-6 gap-y-8 ml-auto mr-auto" role="home">
                    {
                        allPlaces.length > 0 &&
                        allPlaces.map((place, index) =>
                        (
                                <Link to={'/place/' + place._id} key={index}>
                                
                                <div className="grow shrink-0 rounded-lg flex shadow-md shadow-gray-200 z-0 " >
                                    {
                                        place.photos.length > 0  && (
                                            <img src={"https://wnw-api.onrender.com/uploads/" + place.photos[0].newName} alt="img" className=" object-cover aspect-square rounded-lg h-full" key={place._id}/>
                                        )
                                    }
                                </div>
                                <div className="grow-0 shrink mt-1" key={place._id}>
                                    <h3 className="font-bold"> {place.address} </h3>
                                    <h2 className="text-sm truncate text-gray-500" key={place._id}> { place.title } </h2>
                                    <div className="mt-1">
                                        <h3 className="text-sm"> 
                                            <span className="font-bold">€{place.price}</span> per night 
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        )
                        )
                    }
            </div>
            {/*
                <div className="maintenance-container">
                    <div className="maintenance-content">
                        <div className="gear">⚙️</div>
                        <h1>Website Under Maintenance</h1>
                        <p>We are currently working on improvements.<br />Please check back soon.</p>
                    </div>
                </div>
            */}
        </>
    )
}
