import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type PropTypes = { message: string; visible: boolean; closable: boolean; };
const Message: React.FC<PropTypes> = ({ message, visible, closable }) => {
    const [open, setOpen] = useState(visible);

    const handleClose = () => {
        setOpen(false);
    }

    const action = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            {...(closable ? {action} : {})}
            message={message}
            onClose={handleClose}
        />
    );
};

export { Message };
