import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import Transaction from './Transaction/Transaction';

const green = "#8cce7e";
const red = "#e73131";

const Transactions = ({ setTransacId }) => {
    const user_transactions = useSelector((state) => state.transactions);

    return (
        <Grid
            container
            direction="column"
            spacing={2}
            sx={{ marginTop: '1rem', color: '#fff' }}
        >
            {user_transactions.user_economy
                ? user_transactions.user_economy.map((transac) => {
                    let useColor;
                    switch (transac.group) {
                        case 'INCOME':
                            useColor = green;
                            break;
                        default:
                            useColor = red;
                            break;
                    }
                    <Transaction
                        transac={transac}
                        setTransacId={setTransacId}
                        useColor={useColor}
                    />;
                  })
                : null}
        </Grid>
    );
};

export default Transactions;
