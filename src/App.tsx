import React, { useState } from 'react';
import './App.css';
import { Stack } from '@mui/material';
import AppRoutes from '../src/components/AppRoutes';
import CustomBtn from '../src/components/CustomBtn';

function App() {
    const [isLogged, setIsLogged] = useState(true);
    return (
        <div className="App">
            <Stack mt={2} spacing={1} direction="row">
                <CustomBtn variant="outlined" text="About us" href="/"/>
                {isLogged && <CustomBtn variant="outlined" text="Profile" href="/profile"/>}
                <CustomBtn variant="outlined" text={isLogged ? 'Sign out' : 'Sign in'} href="/signin"/>
            </Stack>
            <AppRoutes/>
        </div>
    );
}

export default App;
