
// import React from 'react'
import { useState, createContext,useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";


import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';

// export const AuthedUserContext = createContext(null);


function App() {
    // const [user, setUser] = useState(authService.getUser()); // using the method from authservice




/*--------------- Return ---------------*/

    return (
        <>
            <NavBar/>

            <p>test</p> 

            <Routes>
                <Route path="/" element={<Home/>}/>


            </Routes>
        </>
    )
}

export default App