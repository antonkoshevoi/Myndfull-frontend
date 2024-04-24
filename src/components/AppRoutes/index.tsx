import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AboutPage from 'pages/About';
import SignIn from 'pages/SignIn';
import Profile from 'pages/Profile';
import NotFound from 'pages/NotFound';
import { useToken } from 'context';

const AppRoutes = () => {
    const { token } = useToken();

    return (
        <Router>
            <Routes>
                {!token ? (
                    <>
                        <Route path="/" element={<AboutPage/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                    </>
                ) : (
                    <Route path="/profile" element={<Profile/>}/>
                )}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
