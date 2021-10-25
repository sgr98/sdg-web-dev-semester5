import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

const Dashboard = () => {
    return (
        <div className="Dashboard-Container" style={{ margin: '2rem 0' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            component={Link}
                            to="/dashboard/budgeter"
                            style={{ background: "#fff580", color: "#14279B", fontSize: '120%' }}
                            endIcon={ <CalculateOutlinedIcon fontSize="inherit" /> }
                        >
                            BUDGETER
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                    <Button
                            fullWidth
                            variant="outlined"
                            component={Link}
                            to="/dashboard/analytics"
                            style={{ background: "#4c37af", color: "#eeeeee", fontSize: '120%' }}
                            endIcon={ <BarChartOutlinedIcon fontSize="inherit" /> }
                        >
                            ANALYTICS
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Dashboard;
