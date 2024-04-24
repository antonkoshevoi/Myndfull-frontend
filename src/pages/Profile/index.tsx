import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import CustomBtn from 'components/CustomBtn';
import { Box, Typography } from '@mui/material';
import Logo from 'components/Logo';
import axiosInstance from 'api/http';
import AlertModal from 'components/Modal';
import { useToken } from 'context';

interface ProfileInfo {
    data: {
        fullname: string;
    };
}

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [complate, setComplate] = useState(0);
    const { token } = useToken();
    console.log(token);

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await axiosInstance.get(`/profile?${token}`);
                if (response.status === 200 && response.data.success) {
                    setProfileInfo(response.data);
                }
            } catch (error) {
                console.error('Error when retrieving company information:', error);
            }
        };

        fetchProfileInfo();
    }, []);

    const handleRequestData = async () => {
        try {
            setIsLoading(true);
            setIsOpen(true);
            const ctx = new AbortController();
            const authorResponse = await axiosInstance.get(`/author?${token}`, {
                signal: ctx.signal
            });
            const authorName = authorResponse.data.authorName;
            const quoteResponse = await axiosInstance.get(`/quote?${token}`);
            const quote = quoteResponse.data.quote;
            setIsLoading(false);
            console.log(authorName + ': ' + quote);
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
        }
    };
    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Box mt={4} display="flex">
                <Logo imageUrl="logo.png"/>
                <Box ml={4}>
                    <Typography variant="h3">Welcome, {profileInfo?.data.fullname}!</Typography>
                    <CustomBtn onClick={handleRequestData} text="Update" variant="contained"/>
                </Box>
            </Box>
            <AlertModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isLoading={isLoading}
            />
        </>
    );
};

export default Profile;