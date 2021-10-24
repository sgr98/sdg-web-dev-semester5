import React from 'react';
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material';
// import { useEffect } from 'react';

import './styles.css';

const Navbar = () => {
    const { innerWidth: windowWidth } = window;
    return (
        <Box sx={{ flexGrow: 1 }} style={{margin: '1rem 0'}}>
            <AppBar
                position="static"
                style={{ background: '#4E9F3D', borderRadius: '5px' }}
            >
                <Toolbar>
                    <Typography
                        style={{ bold: true }}
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {windowWidth >= 720 ? 'Home Budget Economy' : 'HBE'}
                    </Typography>
                    <Button color="inherit" style={{margin: '0 1rem 0 1rem'}}>
                        Dashboard
                    </Button>
                    <Button color="inherit" style={{margin: '0 1rem 0 1rem'}}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
