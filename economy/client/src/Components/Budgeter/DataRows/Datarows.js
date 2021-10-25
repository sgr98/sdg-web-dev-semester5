import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, Stack, Typography, Divider, Button, IconButton } from '@mui/material';
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

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "OCT", "NOV", "DEC"];
const green = "#8cce7e";
const red = "#e73131";

const Datarows = () => {
    // const [user, setUser] = useState(
    //     JSON.parse(localStorage.getItem('profile'))
    // );
    const dispatch = useDispatch();
    const user_transactions = useSelector((state) => state.transactions);

    console.log(user_transactions);

    const getDate = (date) => {
        const dat = date.toString().split("T")[0];
        return dat.split("-")[2];
    }

    const getMonth = (date) => {
        const dat = date.toString().split("T")[0];
        return months[dat.split("-")[1]];
    }

    const openModal = () => {

    }

    return (
        <div className="Datarows-Container">
            <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                    dispatch(
                        getBudgeterTransactions('6175f8d7c1c76e15ab698c21')
                    )
                }
                sx={{marginBottom: '2rem'}}
            >
                Get Entries
            </Button>

            <Button
                fullWidth
                variant="contained"
                onClick={openModal}
                sx={{marginBottom: '2rem'}}
            >
                Add a transaction
            </Button>
            
            <Grid container direction='column' spacing={2} sx={{marginTop: '1rem', color: '#fff'}}>
                {user_transactions.user_economy ? 
                    user_transactions.user_economy.map((transac) => {
                        switch(transac.group) {
                            case "INCOME":
                                return (
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={1}
                                        sx={{marginBottom: '0.5rem 0'}}
                                    >
                                        <Item sx={{width: '10%', background: green}}>
                                            <Typography variant="h6">
                                                {`${getDate(transac.updatedAt)} ${getMonth(transac.updatedAt)}`}
                                            </Typography>
                                        </Item>
                                        <Item sx={{width: '66%', background: green}}>
                                            <Typography variant="h6">
                                            {`${transac.group} : ${transac.title}`}
                                            </Typography>
                                        </Item>
                                        <Item sx={{width: '10%', background: green}}>
                                            <Typography variant="h6">
                                                {`${transac.amount}`}
                                            </Typography>
                                        </Item>
                                        <Item sx={{width: '7%', background: green}}>
                                            <IconButton aria-label="delete">
                                                <EditIcon />
                                            </IconButton>
                                        </Item>
                                        <Item sx={{width: '7%', background: green}}>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Item>
                                    </Stack>
                                )
                            default:
                                return (
                                    <Stack
                                        direction="row"
                                        divider={<Divider orientation="vertical" flexItem />}
                                        spacing={1}
                                    >
                                        <Item sx={{width: '10%', background: red}}>
                                            <Typography variant="h6">
                                                {`${getDate(transac.updatedAt)} ${getMonth(transac.updatedAt)}`}
                                            </Typography>
                                        </Item>
                                        <Item sx={{width: '66%', background: red}}>
                                            <Typography variant="h6">
                                            {`${transac.group} : ${transac.title}`}
                                            </Typography>
                                        </Item>
                                        <Item sx={{width: '10%', background: red}}>
                                            <Typography variant="h6">
                                                {`${transac.amount}`}
                                            </Typography>
                                        </Item>
                                        <Item sx={{width: '7%', background: red}}>
                                            <IconButton aria-label="delete">
                                                <EditIcon />
                                            </IconButton>
                                        </Item>
                                        <Item sx={{width: '7%', background: red}}>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Item>
                                    </Stack>
                                )
                        }
                    })
                    : null }
            </Grid>
            
            

        </div>
    );
};

export default Datarows;
