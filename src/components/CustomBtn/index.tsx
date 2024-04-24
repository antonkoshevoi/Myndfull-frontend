import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type variant = 'text' | 'outlined' | 'contained' | undefined

interface IProps {
    mt?: string,
    variant: variant,
    text: string,
    path?: string
    onClick?: () => Promise<void> | void
}

const CustomBtn: FC<IProps> = ({ mt, variant, text, path, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (!path) return;
        navigate(path);
    };
    return (
        <Button
            sx={{ marginTop: `${mt || 0}`, textTransform: 'capitalize' }}
            variant={variant}
            onClick={handleClick}
        >
            {text}
        </Button>
    );
};

export default CustomBtn;