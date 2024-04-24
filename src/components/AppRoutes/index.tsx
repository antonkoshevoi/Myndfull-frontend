import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from 'pages/About';
import SignIn from 'pages/SignIn';
import Profile from 'pages/Profile';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AboutPage/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
