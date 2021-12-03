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
import { 
    getDate, 
    getMonthYear, 
    getMonthFromMonthYear, 
    getyearFromMonthYear 
} from '../../Functions/date';
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

// Returns number of days in February given a year
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
    'FEB': 28,
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

// Income           :   Income
// Necessities      :   Housing/Rent, Periodic Bills, Food, Medical
// Essentials       :   Transportation, Taxes, Insurance
// Semi-Essentials  :   Short Purchases, Consumer Durables
// Luxuries         :   Investment, Recreational, Miscellaneous

const groupOptionsColors = {
    'Income': ['rgba(4, 190, 119, 1)', 'rgba(4, 190, 119, 0.5)'],
    'Necessities': ['rgba(155, 201, 243, 1)', 'rgba(155, 201, 243, 0.5)'],
    'Essentials': ['rgba(83, 161, 233, 1)', 'rgba(83, 161, 233, 0.5)'],
    'Semi-Essentials': ['rgba(24, 111, 190, 1)', 'rgba(24, 111, 190, 0.5)'],
    'Luxuries': ['rgba(15, 69, 118, 1)', 'rgba(15, 69, 118, 0.5)'],
    'Savings Remaining': ['rgba(205, 25, 25, 1)', 'rgba(205, 25, 25, 0.5)']
}

// Options for Line Chart
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Economy Line Chart',
        },
    },
};

const Analytics = () => {
    // User state
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    );

    const dispatch = useDispatch();
    const user_transactions = useSelector((state) => state.transactions);
    // console.log(user_transactions);
    const sidebarDate = useSelector((state) => state.sidebardate);
    // console.log(sidebarDate)
    
    useEffect(() => {
        dispatch(getAnalyticsTransactions(user.result._id.toString()));
    }, [dispatch]);

    // ===========================================
    // BUILDING THE DATASET
    // ===========================================
    const mon = getMonthFromMonthYear(sidebarDate.sideBarDateText);
    const yea = getyearFromMonthYear(sidebarDate.sideBarDateText);
    // Create labels for dataset to be presented in Linechart
    const createLabels = () => {
        let arr = [];
        if(mon === "FEB") {
            for(let i = 1; i <= getDayInFebruary(yea); i++)
                arr.push(i)
        }
        else {
            for(let i = 1; i <= daysInMonths[mon]; i++)
                arr.push(i)
        }
        return arr;
    }
    const labels = createLabels();

    const userTransacs = user_transactions.user_economy ? user_transactions.user_economy : null
    const filterUserTransacs = userTransacs ?
        userTransacs.filter((transac) => {
            const monYear = getMonthYear(transac.createdAt);
            return monYear === sidebarDate.sideBarDateText;
        })
        : null;

    // Create and Initialize data in dataset to 0
    const initializeChartData = () => {
        let data = [];
        for(let i = 0; i < labels.length; i++)
            data.push(0);
        return data;
    }

    // Set Chart data in dataset
    const setChartData = (megaGroup) => {
        let data = initializeChartData();
        const temp = filterUserTransacs ? 
            filterUserTransacs.forEach((filtTransac) => {
                const filtDate = parseInt(getDate(filtTransac.createdAt));
                switch(megaGroup) {
                    case "Income":
                        if(filtTransac.group === "Income")
                            data[filtDate - 1] += filtTransac.amount;
                        break;
                    case "Necessities":
                        if( filtTransac.group === "Housing/Rent" || 
                            filtTransac.group === "Periodic Bills" ||
                            filtTransac.group === "Food" || 
                            filtTransac.group === "Medical" )
                            data[filtDate - 1] += filtTransac.amount;
                        break;
                    case "Essentials":
                        if( filtTransac.group === "Transportation" || 
                            filtTransac.group === "Taxes" ||
                            filtTransac.group === "Insurance" )
                            data[filtDate - 1] += filtTransac.amount;
                        break;
                    case "Semi-Essentials":
                        if( filtTransac.group === "Short Purchases" || 
                            filtTransac.group === "Consumer Durables" )
                            data[filtDate - 1] += filtTransac.amount;
                        break;
                    case "Luxuries":
                        if( filtTransac.group === "Investment" || 
                            filtTransac.group === "Recreational" ||
                            filtTransac.group === "Miscellaneous" )
                            data[filtDate - 1] += filtTransac.amount;
                        break;
                    default:
                        break;
                }
            })
        : null;
        return data;
    }

    // Set Savings Chart data in dataset
    const setSavingsChartData = () => {
        let data = initializeChartData();
        let filtDateIndex = 0;

        const temp = filterUserTransacs ? 
            filterUserTransacs.forEach((filtTransac) => {
                const filtDate = parseInt(getDate(filtTransac.createdAt));
                if(filtDateIndex !== filtDate - 1) {
                    if(filtDateIndex !== 0) {
                        for(let i = filtDateIndex + 1; i <= filtDate - 1; i++)
                            data[i] += data[i - 1];
                    }
                    filtDateIndex = filtDate - 1;
                }
                if( filtTransac.group === "Income" )
                    data[filtDateIndex] += filtTransac.amount;
                else
                    data[filtDateIndex] -= filtTransac.amount;
            })
        : null;

        for(let i = filtDateIndex + 1; i < labels.length; i++)
            data[i] += data[i - 1];
        return data;
    }
    
    // Data for dataset
    const displayTransacData = [
        {
            "megaGroup": "Income",
            data: setChartData("Income"),
        },
        {   
            "megaGroup": "Necessities",
            data: setChartData("Necessities"),
        },
        {   
            "megaGroup": "Essentials",
            data: setChartData("Essentials"),
        },
        {
            "megaGroup": "Semi-Essentials",
            data: setChartData("Semi-Essentials"),
        },
        {
            "megaGroup": "Luxuries",
            data: setChartData("Luxuries"),
        },
        {
            "megaGroup": "Savings Remaining",
            data: setSavingsChartData(),
        },
    ];

    // Parametric data for the Line Chart tag
    const data = {
        labels,
        datasets: displayTransacData.map((dispData) => {
            return ({
                label: dispData.megaGroup,
                data: dispData.data,
                borderColor: groupOptionsColors[dispData.megaGroup][0],
                backgroundColor: groupOptionsColors[dispData.megaGroup][1],
            });
        }),
    };

    if(user === null) {
        return <Redirect to="/auth" />
    }

    return (
        <div className="Analytics-Container">
            <Dashboard />
            <Container sx = {{ margin: '1rem' }}>
                <Line options={options} data={data} />
            </Container>
        </div>
    );
};

export default Analytics;
