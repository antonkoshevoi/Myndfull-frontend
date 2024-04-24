import React, { useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import CustomBtn from 'components/CustomBtn';
import axiosInstance from 'api/http';
import { useNavigate } from 'react-router-dom';
import { useToken } from 'context';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setToken } = useToken();

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password
            });
            if (response.data.success) {
                const token = response.data.data.token;
                setToken(token);
                navigate('/profile');
            } else {
                console.error('Login failed:', response.data.error);
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box mt={3} sx={{ maxWidth: '500px' }}>
            <Helmet>
                <title>Sign in</title>
            </Helmet>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Typography>Email address</Typography>
                    <TextField
                        fullWidth
                        hiddenLabel
                        size="small"
                        id="email"
                        helperText="We'll never share your email with anyone else."
                        variant="outlined"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Typography>Password</Typography>
                    <TextField
                        fullWidth
                        hiddenLabel
                        size="small"
                        id="password"
                        variant="outlined"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <CustomBtn onClick={handleLogin} variant="contained" text="Submit"/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SignIn;
