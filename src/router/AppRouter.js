import React from 'react';
import App from '../App';
import Login from '../components/Login';
import {Routes, Route} from "react-router-dom";
import Header from "../components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';


function AppRouter(props) {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </>
    );
}

export default AppRouter;