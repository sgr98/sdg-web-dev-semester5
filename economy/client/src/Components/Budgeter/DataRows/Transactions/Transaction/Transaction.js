import React, { useState } from 'react';
import { Grid, Paper, Stack, Typography, Divider, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';

import {
    updateTransaction,
    deleteTransaction,
} from '../../../../../actions/transactions';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "OCT", "NOV", "DEC"];

const Transaction = ({ transac, setTransacId, useColor }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );

    const dispatch = useDispatch();

    const getDate = (date) => {
        const dat = date.toString().split("T")[0];
        return dat.split("-")[2];
    }

    const getMonth = (date) => {
        const dat = date.toString().split("T")[0];
        return months[dat.split("-")[1]];
    }

    const handleDelete = (id) => {
        const temp = {
            group: "",
            title: "",
            amount: 0,
        }
        dispatch(deleteTransaction(user.result._id.toString(), id, temp));
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
                <IconButton aria-label="delete">
                    <EditIcon />
                </IconButton>
            </Item>
            <Item sx={{width: '7%', background: useColor}}>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Item>
        </Stack>
    )
}

export default Transaction;