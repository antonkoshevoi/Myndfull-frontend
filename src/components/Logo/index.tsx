import React from 'react';
import { Avatar } from '@mui/material';

interface LogoProps {
    imageUrl: string;
}

const Logo: React.FC<LogoProps> = ({ imageUrl }) => {
    return (
        <Avatar alt="Logo" src={imageUrl} sx={{ width: 100, height: 100, borderRadius: '50%' }} />
    );
};

export default Logo;
