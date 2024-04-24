import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

interface CompanyInfo {
    story: string;
}

const AboutPage = () => {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/info`);
                setCompanyInfo(response.data);
            } catch (error) {
                console.error('Error when retrieving company information:', error);
            }
        };

        fetchCompanyInfo();
    }, []);
    return (
        <Box>
            <Helmet>
                <title>About us</title>
            </Helmet>
            <Box sx={{ width: '100%', marginTop: '40px' }}>
                {companyInfo ? <Typography variant="h2" gutterBottom>
                        {companyInfo.story}
                    </Typography>
                    :
                    <Typography>Loading...</Typography>
                }
            </Box>

        </Box>
    );
};

export default AboutPage;
