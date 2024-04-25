import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from 'pages/About';
import SignIn from 'pages/SignIn';
import Profile from 'pages/Profile';
import NotFound from 'pages/NotFound';
import { useToken } from 'context';
import CustomBtn from 'components/CustomBtn';
import { Stack } from '@mui/material';
import axiosInstance from 'api/http';

const AppRoutes = () => {
    const { token, setToken } = useToken();

    const handleSignOut = async () => {
        if (!token) return;
        try {
            const response = await axiosInstance.delete('/logout');
            if (response.status === 200 && response.data.success) {
                setToken('');
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error when retrieving company information:', error);
        }
    };

    return (
        <Router>
            <Stack mt={2} spacing={1} direction="row">
                <CustomBtn variant="outlined" text="About us" path="/"/>
                {token ? (
                    <CustomBtn variant="outlined" text="Profile" path="/profile"/>
                ) : (
                    <CustomBtn variant="outlined" text="Sign in" path="/signin"/>
                )}
                {token && (
                    <CustomBtn
                        onClick={handleSignOut}
                        variant="outlined"
                        text="Sign out"
                        path="/"
                    />
                )}
            </Stack>
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
