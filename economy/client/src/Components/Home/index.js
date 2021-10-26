import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

import './styles.css';

const Home = () => {
    return (
        <div className="HomeContainer">
            <Container className="home-introduction">
                <Typography
                    variant="h1"
                    component="div"
                    align="center"
                    sx={{ flexGrow: 1 }}
                    className="home-title"
                >
                    Home Budget Economy
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{ flexGrow: 1 }}
                    className="home-title-info"
                >
                    Having money shortage? <br /> <br />
                    Did you know that Home Budgeting and Management itself can contribute 
                    towards your essential as well as desired needs. Home Budget Economy 
                    provides you a platform to collate your income and expenditures. Thereby, 
                    helping you keep track of your finances as well as motivates you to control 
                    your undue expenses.
                </Typography>
            </Container>

            <Container className="home-info">
                <Typography
                    variant="h3"
                    component="div"
                    align="left"
                    sx={{ flexGrow: 1 }}
                    className="home-card-title"
                >
                    Getting Started
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    align="left"
                    sx={{ flexGrow: 1 }}
                    className="home-card-info"
                >
                    To get started with managing your home economy, sign up to the website 
                    by clicking the button below and create an account.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ margin: '2rem' }}
                    component={Link}
                    to="/auth"
                >
                    Click here to Sign In
                </Button>
            </Container>

            <Container className="home-signin">
                <Typography
                    variant="h3"
                    component="div"
                    align="left"
                    sx={{ flexGrow: 1 }}
                    className="home-card-title"
                >
                    How to Use?
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    align="left"
                    sx={{ flexGrow: 1 }}
                    className="home-card-info"
                >
                    After signing up Home Budget Economy provides you with a dashboard. <br />
                    Dashboard has two components: Budgeter and Analytics.
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    align="left"
                    sx={{ flexGrow: 1 }}
                    className="home-card-info"
                >
                    <strong>Budgeter</strong> allows you to add your income and expenses in a tabular format.
                    For adding data you require to enter 4 fields titled as:
                    <br />&ensp;&ensp;&ensp;&ensp;&ensp;Group
                    <br />&ensp;&ensp;&ensp;&ensp;&ensp;Title
                    <br />&ensp;&ensp;&ensp;&ensp;&ensp;Description
                    <br />&ensp;&ensp;&ensp;&ensp;&ensp;Amount
                    <br />with "Description" being optional and rest being mandatory. <br />
                    You can edit or delete the entries provided next to each entry.
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    align="left"
                    sx={{ flexGrow: 1 }}
                    className="home-card-info"
                >
                    <strong>Analytics</strong> eases you to visualize your data by plotting 
                    your data in an area chart graph. This would allow you to visualize
                    your spending habits overtime. The data would also be categorized 
                    according to essentails and luxuries to help you visualize better.
                </Typography>
            </Container>
        </div>
    );
};

export default Home;
