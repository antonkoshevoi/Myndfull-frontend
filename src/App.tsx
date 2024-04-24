import React, { useEffect, useState } from 'react';
import './App.css';
import { Stack } from '@mui/material';
import CustomBtn from 'components/CustomBtn';
import AppRoutes from 'components/AppRoutes';
import { useToken } from 'context';

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const { token, setToken } = useToken();

    useEffect(() => {
        setIsLogged(!!token);
    }, [token]);


    const handleSignOut = () => {
        if (!token) return;
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div className="App">
            <Stack mt={2} spacing={1} direction="row">
                <CustomBtn variant="outlined" text="About us" href="/"/>
                {isLogged && <CustomBtn variant="outlined" text="Profile" href="/profile"/>}
                <CustomBtn onClick={handleSignOut} variant="outlined" text={isLogged ? 'Sign out' : 'Sign in'}
                           href={isLogged ? '/' : `/signin`}/>
            </Stack>
            <AppRoutes/>
        </div>
    );
}

export default App;
