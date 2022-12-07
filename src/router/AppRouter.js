import React from 'react';
import App from '../App';
import Login from '../components/Login';
import {Routes, Route} from "react-router-dom";
import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "../components/SignUp";


function AppRouter(props) {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
            </Routes>
        </>
    );
}

export default AppRouter;