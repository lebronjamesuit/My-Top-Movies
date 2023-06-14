import "./App.css";
import { Auth } from "./components/auth";
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Contact from "./components/contact";

import EnterMovie from "./components/enterMovie";
import { SideBar } from "./components/sideBar";
import { Login } from "./components/login";

import AuthenContext, {Provider} from "./context/authenContext";
import { useContext } from "react";


function App() {
  console.log("Re-render App ");

  const {userLogged, chaneUserLogged} = useContext(AuthenContext); // Match with valueToShare in file authenContext.js
  console.log(userLogged.length);
 

  return (

    <div className="container">
 
    <div className="flex">
       <BrowserRouter>
          <Routes>
          <Route path="/" element={<SideBar />}>
            
          {  userLogged.length > 0  ? (
            <>
              <Route path="contact" element={<Contact />} />
              <Route path="enterMovie" element={<EnterMovie />} />
            </>
          ) : (
            <Route index element={<Login />} />
          )}

      
            </Route>
          </Routes>
      </BrowserRouter>   
     
   
      </div>
      
      <br />


    </div>
  );
}

export default App;
