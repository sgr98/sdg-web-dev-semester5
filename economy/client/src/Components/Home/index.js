import React from 'react';
import { Container, Typography } from '@mui/material';

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
                    PlaceHolder Text. PlaceHolder Text. PlaceHolder Text. PlaceHolder Text.
                    PlaceHolder Text. PlaceHolder Text. PlaceHolder Text. PlaceHolder Text.
                    PlaceHolder Text. PlaceHolder Text. PlaceHolder Text. PlaceHolder Text.
                    PlaceHolder Text. PlaceHolder Text. PlaceHolder Text. PlaceHolder Text.
                    PlaceHolder Text. PlaceHolder Text. PlaceHolder Text. PlaceHolder Text.
                </Typography>
            </Container>
            <Container className="home-info">Hello</Container>
            <Container className="home-signin">Hello</Container>
        </div>
    );
};

export default Home;
