import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './styles.css';

const Home = () => {
    return (
        <div className="HomeContainer">
            <section className="home-introduction-section">
                <div className="home-introduction">
                    <Typography
                        // variant="h2"
                        component="div"
                        align="left"
                        sx={{ flexGrow: 1, fontSize: '70px' }}
                        className="home-title"
                    >
                        <div className="home-title-sub">
                            <div>Home</div>
                            <div>Budget</div>
                            <div>Economy</div>
                        </div>
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
                </div>
            </section>

            <section>
                <div className="home-signin">
                    <Typography
                        variant="h3"
                        component="div"
                        align="left"
                        sx={{ flexGrow: 1 }}
                        className="home-card-title"
                    >
                        How to Use?
                    </Typography>

                    <div className="home-card-container">
                        <div>
                            <Typography
                                component="div"
                                align="left"
                                sx={{ flexGrow: 1 }}
                                className="home-card-info"
                            >
                                After signing in, Home Budget Economy provides you with a dashboard. 
                                Dashboard will connect you with your necessary tools required to 
                                start budgeting. <br />
                                Dashboard contains Budgeter and Analytics.
                            </Typography>
                            <Typography
                                component="div"
                                align="left"
                                sx={{ flexGrow: 1 }}
                                className="home-card-info"
                            >
                                <strong>Budgeter</strong> allows you to add your income and expenses in 
                                a tabular format. For adding data you require to enter 4 fields titled as:
                                <br />&ensp;&ensp;&ensp;&ensp;&ensp;Group
                                <br />&ensp;&ensp;&ensp;&ensp;&ensp;Title
                                <br />&ensp;&ensp;&ensp;&ensp;&ensp;Description
                                <br />&ensp;&ensp;&ensp;&ensp;&ensp;Amount
                                <br />with "Description" being optional and rest being mandatory. <br />
                                You can edit or delete the entries provided next to each entry. <br /> 
                                <br />
                                Your data will be automatically arranged in their respective categories
                                colour coded in terms of necessities.
                            </Typography>
                            <Typography
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
                        </div>
                        <div>
                            <div className="home-signin-image"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="home-info">
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
                        by clicking the button below. This will take you to the sign in page where 
                        you can navigate to the sign up page. Fill all the the necessary fields
                        and you will be ready for budgeting your expenditures and making yourselves 
                        financially stable.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{ margin: '3rem 1rem 0 1rem' }}
                        component={Link}
                        to="/auth"
                    >
                        Click here to Sign In
                    </Button>
                </div>
            </section>

            <section>
                <div className="home-footer">
                    <Typography
                        variant="h6"
                        component="div"
                        align="center"
                        sx={{ flexGrow: 1 }}
                        className="home-footer-sub"
                    >
                        Developed by sgr98. 
                    </Typography>

                    <Typography
                        variant="h6"
                        component="div"
                        align="center"
                        sx={{ flexGrow: 1 }}
                        className="home-footer-sub"
                    >   
                        <IconButton 
                            color="inherit" 
                            sx={{ margin: '0 1rem' }} 
                            href="https://github.com/sgr98"
                            target="_blank"
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton 
                            color="inherit" 
                            sx={{ margin: '0 1rem' }} 
                            href="https://www.linkedin.com/in/sagar-singh-s98/"
                            target="_blank"
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Typography>
                </div>
            </section>
        </div>
    );
};

export default Home;
