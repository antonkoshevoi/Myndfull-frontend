import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import CustomBtn from '../../components/CustomBtn';

const SignIn = () => {
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
                    />
                </Grid>
                <Grid item>
                    <CustomBtn variant="contained" text="Submit"/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SignIn;
