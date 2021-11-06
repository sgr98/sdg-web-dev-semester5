import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button} from '@mui/material';
import { useDispatch } from 'react-redux';

import {
    getBudgeterTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from '../../../actions/transactions';
import './styles.css';

import TransactionModal from './TransactionModal/TransactionModal';
import Transactions from './Transactions/Transactions';

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
                    clearModal();
                    setCreateEntry(true);
                }}
                sx={{marginBottom: '2rem'}}
            >
                Make an entry
            </Button>

            <TransactionModal
                openModal={openModal}
                handleModalClose={handleModalClose}
                handleSubmit={handleSubmit}
                createEntry={createEntry}
                tempTransaction={tempTransaction}
                setTempTransaction={setTempTransaction}
                clearModal={clearModal}
            />
            
            <Transactions
                user_transactions={user_transactions}
                setTempTransaction={setTempTransaction}
                setTransacId={setTransacId}
                setCreateEntry={setCreateEntry}
                handleModalOpen={handleModalOpen}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default Datarows;
