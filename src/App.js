import "./App.css";
import { Auth } from "./components/auth";
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import Layout from "./components/layOut";
import Home from "./components/home";
import Contact from "./components/contact";

import EnterMovie from "./components/enterMovie";
import { SideBar } from "./components/sideBar";
import { Login } from "./components/login";

function App() {
  console.log("Re-render App component");


  return (

    <div className="container">
 
    <div className="flex">
       <BrowserRouter>
          <Routes>
          <Route path="/" element={<SideBar />}>
              <Route index element={<Login />} />
              <Route path="contact" element={<Contact />} />
              <Route path="enterMovie" element={<EnterMovie />} />
            </Route>
          </Routes>
      </BrowserRouter>   

      </div>
      
      <br />


    </div>
  );
}

export default App;
