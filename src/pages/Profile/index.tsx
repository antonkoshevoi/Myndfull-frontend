import { Helmet } from 'react-helmet';
import React from 'react';
import CustomBtn from '../../components/CustomBtn';
import { Box, Typography } from '@mui/material';
import Logo from '../../components/Logo';

const Profile = () => {
    return (
        <div>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Box mt={4} display="flex">
                <Logo imageUrl="logo.png"/>
                <Box ml={4}>
                    <Typography variant="h3">Welcome, Anton!</Typography>
                    <CustomBtn text="Update" variant="contained"/>
                </Box>
            </Box>
        </div>
    );
};

export default Profile;