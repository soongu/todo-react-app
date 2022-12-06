import React from 'react';
import App from '../App';
import Login from '../components/Login';
import {Routes, Route} from "react-router-dom";


function AppRouter(props) {
    return (
        <>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </>
    );
}

export default AppRouter;