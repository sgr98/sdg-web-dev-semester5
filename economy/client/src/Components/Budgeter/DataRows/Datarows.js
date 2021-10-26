import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { Button } from '@mui/material';
// import { Button, Modal, Box, TextField, MenuList, MenuItem, ListItemText, Divider } from '@mui/material';
import { Grid, Paper, Stack, Typography, Divider, Button, IconButton, Modal, Box, TextField, MenuList, MenuItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    getBudgeterTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from '../../../actions/transactions';
import './styles.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const green = "#8cce7e";
const red = "#e73131";

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

// ///////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////
const Datarows = () => {
    // //////////////////////////////////////////////////
    // Initalization
    // //////////////////////////////////////////////////
    const [transacId, setTransacId] = useState(0);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );
    // console.log(user)
    const dispatch = useDispatch();
    const user_transactions = useSelector((state) => state.transactions);
    // console.log(user_transactions);
    
    useEffect(() => {
        dispatch(getBudgeterTransactions(user.result._id.toString()));
    }, [transacId, dispatch]);

    // //////////////////////////////////////////////////
    // Modal
    // //////////////////////////////////////////////////
    const [tempTransaction, setTempTransaction] = useState({
        group: "EXPENDITURE",
        title: "",
        description: "",
        amount: 0,
    });
    const [openModal, setOpenModal] = useState(false);
    const [createEntry, setCreateEntry] = useState(true);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => {setOpenModal(false); setCreateEntry(true);};
    
    const clearModal = () => {
        setTransacId(0);
        setTempTransaction({
            group: "EXPENDITURE",
            title: "",
            description: "",
            amount: 0,
        })
    }

    const verifySubmitInput = () => {
        if(tempTransaction.group === "" || tempTransaction.title === "")
            return false;
        return true;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!verifySubmitInput())
            return;

        if(createEntry) {
            dispatch(createTransaction(user.result._id.toString(), tempTransaction));
        }
        else {
            dispatch(updateTransaction(user.result._id.toString(), transacId, tempTransaction));
        }
        clearModal();
        handleModalClose();
    }

    // //////////////////////////////////////////////////
    // List
    // //////////////////////////////////////////////////
    const getDate = (date) => {
        const dat = date.toString().split("T")[0];
        return dat.split("-")[2];
    }

    const getMonth = (date) => {
        const dat = date.toString().split("T")[0];
        const mon = parseInt(dat.split("-")[1]);
        return months[mon - 1];
    }

    const handleDelete = (id) => {
        const temp = {
            group: "",
            title: "",
            description: "",
            amount: 0,
        }
        // console.log(id)
        dispatch(deleteTransaction(user.result._id.toString(), id, temp));
    }

    return (
        <div className="Datarows-Container">
            {/* <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                    dispatch(
                        getBudgeterTransactions(user.result._id.toString())
                    )
                }
                sx={{marginBottom: '2rem'}}
            >
                Get Entries
            </Button> */}

            <Button
                fullWidth
                variant="contained"
                onClick={() => {
                    handleModalOpen();
                    setCreateEntry(true);
                }}
                sx={{marginBottom: '2rem'}}
            >
                {createEntry ? "Make an entry" : "Edit an entry" }
            </Button>

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
                            Make an Entry
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
            
            <Grid container direction='column' spacing={2} sx={{marginTop: '1rem', color: '#fff'}}>
                {user_transactions.user_economy ? 
                    user_transactions.user_economy.map((transac) => {
                        let useColor;
                        switch(transac.group) {
                            case "INCOME":
                                useColor = green;
                                break;
                            default:
                                useColor = red;
                                break;
                        }
                        return (
                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem />}
                                spacing={1}
                                sx={{marginBottom: '0.5rem 0'}}
                                key={transac._id}
                            >
                                <Item sx={{width: '10%', background: useColor}}>
                                    <Typography variant="h6">
                                        {`${getDate(transac.updatedAt)} ${getMonth(transac.updatedAt)}`}
                                    </Typography>
                                </Item>
                                <Item sx={{width: '66%', background: useColor}}>
                                    <Typography variant="h6">
                                    {`${transac.group} : ${transac.title}`}
                                    </Typography>
                                </Item>
                                <Item sx={{width: '10%', background: useColor}}>
                                    <Typography variant="h6">
                                        {`${transac.amount}`}
                                    </Typography>
                                </Item>
                                <Item sx={{width: '7%', background: useColor}}>
                                    <IconButton aria-label="edit" onClick={() => {
                                        setTransacId(transac._id);
                                        setTempTransaction({
                                            group: transac.group,
                                            title: transac.title,
                                            description: transac.description,
                                            amount: transac.amount,
                                        });
                                        setCreateEntry(false);
                                        setOpenModal(true);
                                    }}>
                                        <EditIcon />
                                    </IconButton>
                                </Item>
                                <Item sx={{width: '7%', background: useColor}}>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(transac._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Item>
                            </Stack>
                        )
                    })
                    : null }
            </Grid>
            
            

        </div>
    );
};

export default Datarows;
