
// import React from 'react'
import { useState, createContext,useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";


import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import GameBlackjack from './components/GameBlackjack/GameBlackjack';

import * as authService from './services/authService'

export const AuthedUserContext = createContext(null);


function App() {
    
    const [user, setUser] = useState(authService.getUser()); // checkins for a token from authService

    const handleSignout = () => {
        authService.signout();
        setUser(null);
      };


    useEffect(() => {
    console.log('App user state:', user);
    }, [user]);
    
    


/*--------------- Return ---------------*/

    return (
        
        <AuthedUserContext.Provider value={user}>
        
            <NavBar user={user} handleSignout={handleSignout}/>

            <Routes>
                <Route path="/" element={<Home setUser={setUser}/>}/>
                
                {/* Protected Routes */}
                { user && (
                    <>
                    {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
                    <Route path="/game/basic-strategy" element={<GameBlackjack/>}/>
                    </>
                )}
            </Routes>
        </AuthedUserContext.Provider>
    )
}

export default App