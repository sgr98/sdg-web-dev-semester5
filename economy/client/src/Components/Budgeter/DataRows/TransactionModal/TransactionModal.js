import React from 'react';
import { 
    Typography, 
    Button, 
    Modal, 
    Box, 
    TextField,
} from '@mui/material';
// import {
//     List,
//     ListItem,
//     ListItemText,
//     MenuItem,
//     Menu
// } from '@mui/material';

import ModalGroupDropdown from './ModalGroupDropdown';
import { modalBoxStyle, modalBoxTitle, modalBoxText } from './styles';

const TransactionModal = ({ 
    openModal,
    handleModalClose,
    handleSubmit,
    createEntry,
    tempTransaction,
    setTempTransaction,
    clearModal,
 }) => {
    return (
        <Modal
            open={openModal}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalBoxStyle}>
                <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Typography 
                        id="modal-modal-title" 
                        variant="h6" 
                        component="h2"
                        sx={modalBoxTitle}
                    >
                        { createEntry ? "Make an entry" : "Edit an entry" }
                    </Typography>
                    
                    <ModalGroupDropdown 
                        tempTransaction={tempTransaction}
                        setTempTransaction={setTempTransaction} 
                    />
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        required
                        color="secondary"
                        value={tempTransaction.title}
                        sx={modalBoxText}
                        onChange={(e) => setTempTransaction({ ...tempTransaction, title: e.target.value })} 
                    />
                    <TextField 
                        name="description" 
                        variant="outlined" 
                        label="Description" 
                        fullWidth
                        color="secondary"
                        value={tempTransaction.description}
                        sx={modalBoxText}
                        onChange={(e) => setTempTransaction({ ...tempTransaction, description: e.target.value })} 
                    />
                    <TextField 
                        name="amount" 
                        variant="outlined" 
                        label="Amount" 
                        fullWidth
                        required
                        type="number"
                        color="secondary"
                        value={tempTransaction.amount}
                        sx={modalBoxText}
                        onChange={(e) => setTempTransaction({ ...tempTransaction, amount: e.target.value })} 
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        type="submit" 
                        fullWidth
                        sx={{ marginTop: '1.5rem' }}
                    >Submit</Button>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="small" 
                        onClick={clearModal} 
                        fullWidth
                        sx={{ marginTop: '1rem' }}
                    >Clear</Button>

                </form>
            </Box>
        </Modal>
    )
}

export default TransactionModal;