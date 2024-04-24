import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from '../../pages/About';
import SignIn from '../../pages/SignIn';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AboutPage/>}/>
                <Route path="/signin" element={<SignIn/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
