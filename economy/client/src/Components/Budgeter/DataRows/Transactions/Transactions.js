import React, { useState } from 'react';
import { 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    Typography,
    Divider,
    IconButton,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { 
    budgeterDropdownBox, 
    budgeterTitleBox, 
    budgeterDescriptionBox, 
    budgeterAmountBox,
    budgeterSavingsContainer, 
    budgeterSavings,
} from './styles';

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
    'Income': ['rgba(4, 190, 119, 0.9)', 'rgba(4, 190, 119, 0.2)'],
    'Housing/Rent': ['rgba(155, 201, 243, 0.9)', 'rgba(155, 201, 243, 0.2)'],
    'Periodic Bills': ['rgba(155, 201, 243, 0.9)', 'rgba(155, 201, 243, 0.2)'],
    'Food': ['rgba(155, 201, 243, 0.9)', 'rgba(155, 201, 243, 0.2)'],
    'Medical': ['rgba(155, 201, 243, 0.9)', 'rgba(155, 201, 243, 0.2)'],
    'Transportation': ['rgba(83, 161, 233, 0.9)', 'rgba(83, 161, 233, 0.2)'],
    'Taxes': ['rgba(83, 161, 233, 0.9)', 'rgba(83, 161, 233, 0.2)'],
    'Insurance': ['rgba(83, 161, 233, 0.9)', 'rgba(83, 161, 233, 0.2)'],
    'Short Purchases': ['rgba(24, 111, 190, 0.9)', 'rgba(24, 111, 190, 0.2)'],
    'Consumer Durables': ['rgba(24, 111, 190, 0.9)', 'rgba(24, 111, 190, 0.2)'],
    'Investment': ['rgba(15, 69, 118, 0.9)', 'rgba(15, 69, 118, 0.2)'],
    'Recreational': ['rgba(15, 69, 118, 0.9)', 'rgba(15, 69, 118, 0.2)'],
    'Miscellaneous': ['rgba(15, 69, 118, 0.9)', 'rgba(15, 69, 118, 0.2)'],
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
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteDialogOpen = () => {
        setOpenDeleteDialog(true);
    };
    
      const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

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

    // Convert amount in international comma format
    const commaFormatAmount = (amt) => {
        if(amt === 0)
            return "0";
            
        const isPositive = amt >= 0;
        if(!isPositive)
            amt *= -1;
            
        let comForAmt = "";
        let count = 1;
        while(amt !== 0) {
            const n = amt % 10;
            comForAmt = n + comForAmt;
            if(count === 3 && amt > 10) {
                comForAmt = "," + comForAmt;
                count = 0;
            }
            count++;
            amt /= 10;
            amt = Math.floor(amt);
        }
        
        if(!isPositive)
            comForAmt = "- " + comForAmt
        return comForAmt;
    }

    // Fot total savings
    const savings = {sum: 0};
    const addTotalSavings = (transac) => {
        if(transac.group === 'Income')
            savings.sum += transac.amount;
        else
            savings.sum -= transac.amount; 
    }

    return (
        <div style={{marginTop: '1rem', color: '#fff'}}>
            {groupOptions.map((groupOpt, index) => {
                const useColor = groupOptionsColors[groupOpt];
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx = {{ bgcolor: useColor[0] }}
                            // sx = {{ bgcolor: 'rgba(38, 159, 66, 0.2)' }}
                        >
                            <Typography sx={{ fontSize: '140%' }}>{groupOpt}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails sx={{ bgcolor: useColor[1] }}>
                        {user_transactions.user_economy ? 
                            user_transactions.user_economy.map((transac, index, array) => {
                                addTotalSavings(transac)
                                return (
                                    transac.group === groupOpt ? (
                                        <div key={index}>
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
                                                
                                                <Typography variant="h6" sx={budgeterAmountBox}>
                                                    {commaFormatAmount(transac.amount)}
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

                                                {/* <Dialog
                                                    open={openDeleteDialog}
                                                    onClose={handleDeleteDialogClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        Do you want to delete this entry?
                                                    </DialogTitle>
                                                    <DialogActions>
                                                    <Button onClick={handleDeleteDialogClose}>No</Button>
                                                    <Button onClick={() => handleDelete(transac._id)}>
                                                        Yes
                                                    </Button>
                                                    </DialogActions>
                                                </Dialog> */}
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
            <Container sx={budgeterSavingsContainer}>
                <Typography variant="h6" sx={budgeterSavings}>
                    Savings : {savings.sum < 0 ? 
                        <>
                            &#8722;{commaFormatAmount(-1 * savings.sum / groupOptions.length)} 
                        </> 
                        : 
                        <> 
                            {commaFormatAmount(savings.sum / groupOptions.length)} 
                        </>
                    }
                </Typography>
            </Container>
        </div>
    );
};

export default Transactions;