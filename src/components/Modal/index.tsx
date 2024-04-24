import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import CustomBtn from 'components/CustomBtn';
import LoadingDots from 'components/LoadingDots';
import axiosInstance from 'api/http';

interface IProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isLoading: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '10%',
    left: '10%',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 10,
    p: 4,
};

const AlertModal: FC<IProps> = ({ isOpen, setIsOpen, isLoading }) => {
    const [isAuthorRequestCompleted, setIsAuthorRequestCompleted] = useState(false);
    const [isQuoteRequestCompleted, setIsQuoteRequestCompleted] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <React.Fragment>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        Requesting the quote
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Step 1: Requesting author {isLoading && !isAuthorRequestCompleted && <LoadingDots/>}
                        {isAuthorRequestCompleted && 'Complete'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Step 2: Requesting quote {isLoading && !isQuoteRequestCompleted && <LoadingDots/>}
                        {isQuoteRequestCompleted && 'Complete'}
                    </Typography>
                    <CustomBtn mt="10px" variant="contained" text="Cancel"/>
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default AlertModal;