import React from 'react';
import './App.css';
import { Stack } from '@mui/material';
import AppRoutes from '../src/components/AppRoutes';
import CustomBtn from '../src/components/CustomBtn';

function App() {
    return (
        <div className="App">
            <Stack mt={2} spacing={1} direction="row">
                <CustomBtn variant="outlined" text="About us" href="/"/>
                <CustomBtn variant="outlined" text="Sign in" href="/signin"/>
            </Stack>
            <AppRoutes/>
        </div>
    );
}

export default App;
