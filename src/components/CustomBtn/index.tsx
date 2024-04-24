import { Button } from '@mui/material';
import { FC } from 'react';

type variant = 'text' | 'outlined' | 'contained' | undefined

interface IProps {
    mt?: string,
    variant: variant,
    text: string,
    href?: string
    onClick?: () => Promise<void> | void
}

const CustomBtn: FC<IProps> = ({ mt, variant, text, href, onClick }) => {
    return (
        <Button
            sx={{ marginTop: `${mt || 0}`, textTransform: 'capitalize' }}
            href={href}
            variant={variant}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default CustomBtn;