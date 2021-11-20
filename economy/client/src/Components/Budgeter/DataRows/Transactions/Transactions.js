import React, { useState } from 'react';
import { 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
    IconButton,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { budgeterDropdownBox, budgeterTitleBox, budgeterDescriptionBox } from './styles';

const groupOptions = [
    'Income',
    'Housing/Rent',
    'Periodic Bills',
    'Food',
    'Medical',
    'Transportation',
    'Taxes',
    'Insurance',
    'Short Purchases',
    'Consumer Durables',
    'Investment',
    'Recreational',
    'Miscellaneous',
];

const groupOptionsColors = {
    'Income': ['rgba(38, 159, 66, 0.9)', 'rgba(38, 159, 66, 0.2)'],
    'Housing/Rent': ['rgba(255, 194, 12, 0.9)', 'rgba(255, 194, 12, 0.2)'],
    'Periodic Bills': ['rgba(255, 194, 12, 0.9)', 'rgba(255, 194, 12, 0.2)'],
    'Food': ['rgba(255, 194, 12, 0.9)', 'rgba(255, 194, 12, 0.2)'],
    'Medical': ['rgba(255, 194, 12, 0.9)', 'rgba(255, 194, 12, 0.2)'],
    'Transportation': ['rgba(15, 80, 182, 0.9)', 'rgba(15, 80, 182, 0.2)'],
    'Taxes': ['rgba(15, 80, 182, 0.9)', 'rgba(15, 80, 182, 0.2)'],
    'Insurance': ['rgba(15, 80, 182, 0.9)', 'rgba(15, 80, 182, 0.2)'],
    'Short Purchases': ['rgba(124, 43, 177, 0.9)', 'rgba(124, 43, 177, 0.2)'],
    'Consumer Durables': ['rgba(124, 43, 177, 0.9)', 'rgba(124, 43, 177, 0.2)'],
    'Investment': ['rgba(243, 115, 0, 0.9)', 'rgba(243, 115, 0, 0.2)'],
    'Recreational': ['rgba(243, 115, 0, 0.9)', 'rgba(243, 115, 0, 0.2)'],
    'Miscellaneous': ['rgba(243, 115, 0, 0.9)', 'rgba(243, 115, 0, 0.2)'],
}

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

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
        <div style={{marginTop: '1rem', color: '#fff'}}>
            {groupOptions.map((groupOpt) => {
                const useColor = groupOptionsColors[groupOpt];
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx = {{ bgcolor: useColor[0] }}
                            // sx = {{ bgcolor: 'rgba(38, 159, 66, 0.2)' }}
                        >
                            <Typography sx={{ fontSize: '150%' }}>{groupOpt}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails sx={{ bgcolor: useColor[1] }}>
                        {user_transactions.user_economy ? 
                            user_transactions.user_economy.map((transac, index, array) => {
                                return (
                                    transac.group === groupOpt ? (
                                        <div>
                                            <Box
                                                sx={budgeterDropdownBox}
                                            >
                                                <Typography variant="h6" sx={{ width: '8%' }}>
                                                    {`${getDate(transac.createdAt)} ${getMonth(transac.createdAt)}`}
                                                </Typography>
                                                <Divider orientation="vertical" flexItem />

                                                <Typography variant="h6" sx={budgeterTitleBox}>
                                                    {`${transac.title}`}
                                                    <Typography sx={budgeterDescriptionBox}>
                                                        {`${transac.description}`}
                                                    </Typography>
                                                </Typography>
                                                <Divider orientation="vertical" flexItem />
                                                
                                                <Typography variant="h6" sx={{ width: '10%' }}>
                                                    {`${transac.amount}`}
                                                </Typography>
                                                <Divider orientation="vertical" flexItem />

                                                <IconButton 
                                                    color="primary"
                                                    aria-label="edit" 
                                                    // size="small"
                                                    sx={{ width: '6%' }}
                                                    onClick={() => {
                                                        setTransacId(transac._id);
                                                        setTempTransaction({
                                                            group: transac.group,
                                                            title: transac.title,
                                                            description: transac.description,
                                                            amount: transac.amount,
                                                        });
                                                        setCreateEntry(false);
                                                        handleModalOpen();
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <Divider orientation="vertical" flexItem />

                                                <IconButton 
                                                    color="error"
                                                    aria-label="delete" 
                                                    size="small"
                                                    sx={{ width: '6%' }}
                                                    onClick={() => handleDelete(transac._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                            {/* { index !== array.length - 1 ? <Divider /> : null } */}
                                            <Divider />
                                        </div>
                                    ) : null 
                                )
                            })
                            : null }
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
};

export default Transactions;