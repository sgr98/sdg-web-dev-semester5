import React from 'react';
import { Typography, Button, Modal, Box, TextField } from '@mui/material';

const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ddd',
    color: '#030303',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

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
                        sx={{ marginBottom: '2rem 0' }}
                    >
                        { createEntry ? "Make an entry" : "Edit an entry" }
                    </Typography>
                    <TextField 
                        name="group" 
                        variant="outlined" 
                        label="Group" 
                        fullWidth
                        required
                        color="secondary"
                        value={tempTransaction.group}
                        sx={{ margin: '0.5rem 0' }}
                        onChange={(e) => setTempTransaction({ ...tempTransaction, group: e.target.value })} 
                    />
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        required
                        color="secondary"
                        value={tempTransaction.title}
                        sx={{ margin: '0.5rem 0' }}
                        onChange={(e) => setTempTransaction({ ...tempTransaction, title: e.target.value })} 
                    />
                    <TextField 
                        name="description" 
                        variant="outlined" 
                        label="Description" 
                        fullWidth
                        color="secondary"
                        value={tempTransaction.description}
                        sx={{ margin: '0.5rem 0' }}
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
                        sx={{ margin: '0.5rem 0' }}
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