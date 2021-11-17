import React from 'react';
import { Grid, Paper, Stack, Typography, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Item theme for rows
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

const Transactions = ({ 
    user_transactions,
    setTempTransaction,
    setTransacId,
    setCreateEntry,
    handleModalOpen,
    handleDelete,
}) => {
    // Get date from row Data
    const getDate = (date) => {
        const dat = date.split("T")[0];
        return dat.split("-")[2];
    }

    // Get month from row Data
    const getMonth = (date) => {
        const dat = date.split("T")[0];
        const mon = parseInt(dat.split("-")[1]);
        return months[mon - 1];
    }

    return (
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
                                    {`${getDate(transac.createdAt)} ${getMonth(transac.createdAt)}`}
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
                                    handleModalOpen();
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
    );
};

export default Transactions;
