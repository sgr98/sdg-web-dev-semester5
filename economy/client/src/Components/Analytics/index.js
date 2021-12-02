import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { Redirect } from 'react-router-dom'
// import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';
import { Container } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import Dashboard from '../Dashboard';
import { getAnalyticsTransactions } from '../../actions/transactions';
import './styles.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const getDayInFebruary = (year) => {
    if(year % 4 === 0) {
        if(year % 100 === 0) {
            if(year % 400 === 0)
                return 29;
            return 28;
        }
        return 29;
    }
    return 28;
}

const daysInMonths = {
    'JAN': 31,
    'FEB': getDayInFebruary(2021),
    'MAR': 31,
    'APR': 30,
    'MAY': 31,
    'JUN': 30,
    'JUL': 31,
    'AUG': 31,
    'SEP': 30,
    'OCT': 31,
    'NOV': 30,
    'DEC': 31
};

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
    'Income': ['rgba(4, 190, 119, 1)', 'rgba(4, 190, 119, 0.5)'],
    'Housing/Rent': ['rgba(155, 201, 243, 1)', 'rgba(155, 201, 243, 0.5)'],
    'Periodic Bills': ['rgba(155, 201, 243, 1)', 'rgba(155, 201, 243, 0.5)'],
    'Food': ['rgba(155, 201, 243, 1)', 'rgba(155, 201, 243, 0.5)'],
    'Medical': ['rgba(155, 201, 243, 1)', 'rgba(155, 201, 243, 0.5)'],
    'Transportation': ['rgba(83, 161, 233, 1)', 'rgba(83, 161, 233, 0.5)'],
    'Taxes': ['rgba(83, 161, 233, 1)', 'rgba(83, 161, 233, 0.5)'],
    'Insurance': ['rgba(83, 161, 233, 1)', 'rgba(83, 161, 233, 0.5)'],
    'Short Purchases': ['rgba(24, 111, 190, 1)', 'rgba(24, 111, 190, 0.5)'],
    'Consumer Durables': ['rgba(24, 111, 190, 1)', 'rgba(24, 111, 190, 0.5)'],
    'Investment': ['rgba(15, 69, 118, 1)', 'rgba(15, 69, 118, 0.5)'],
    'Recreational': ['rgba(15, 69, 118, 1)', 'rgba(15, 69, 118, 0.5)'],
    'Miscellaneous': ['rgba(15, 69, 118, 1)', 'rgba(15, 69, 118, 0.5)'],
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};
  
const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [324, 45, 475, -56, 888, 465, 500],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [0, 821, 255, -100, 689, 512, 350],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const Analytics = () => {
    // User state
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );

    const dispatch = useDispatch();
    const user_transactions = useSelector((state) => state.transactions);
    // console.log(user_transactions);
    
    useEffect(() => {
        dispatch(getAnalyticsTransactions(user.result._id.toString()));
    }, [dispatch]);

    // Building the dataset
    const data1 = {
        labels,
        datasets: groupOptions.map((groupOpt) => {
            return ({
                label: groupOpt,
                data: user_transactions.user_economy ? 
                    user_transactions.user_economy.map((transac) => {
                        if(transac.group === groupOpt)
                            return transac.amount
                    })
                    : [],
                borderColor: groupOptionsColors[groupOpt][0],
                backgroundColor: groupOptionsColors[groupOpt][1],
            });
        }),
    };

    // const date = new Date()
    // console.log(date.getDate(), date.getHours())

    if(user === null) {
        return <Redirect to="/auth" />
    }

    return (
        <div className="Analytics-Container">
            <Dashboard />
            <Container sx = {{ margin: '1rem' }}>
                {/* {user_transactions.user_economy ? user_transactions.user_economy.toString() : null} */}
                <Line options={options} data={data} />;
            </Container>
        </div>
    );
};

export default Analytics;
