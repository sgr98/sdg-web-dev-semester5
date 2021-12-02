import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Button,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const tempDates = ["NOV 2021", "DEC 2021", "JAN 2022", "FEB 2022", 
    "MAR 2022", "APR 2022", "MAY 2022", "JUN 2022", "JUL 2022", 
    "AUG 2022", "SEP 2022", "OCT 2022", "NOV 2022", "DEC 2022"];

const Dashboard = () => {
    const getMonth = (date) => {
        const dat = date.split("T")[0];
        const mon = parseInt(dat.split("-")[1]);
        return months[mon - 1];
    }

    const getYear = (date) => {
        const dat = date.split("T")[0];
        return dat.split("-")[0];
    }

    const getMonthYear = (date) => {
        if(typeof date === "string") {
            const dat = getMonth(date) + " " + getYear(date);
            return dat;
        }
        else {
            const mon = date.getMonth();
            const year = date.getFullYear();
            const dat = months[mon] + " " + year.toString();
            return dat;
        }
    }

    const [sideBarDateText, setSideBarDateText] = useState(getMonthYear(new Date()));

    const setSideBarDate = (text) => {
        setSideBarDateText(text);
    }

    const [sidebarStatus, setSidebarStatus] = useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' 
            && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setSidebarStatus(open);
    };

    const sideBarDateList = (anchor) => (
        <Box
            sx={{ 
                width: '14rem',
                background: '#515f71',
                color: '#f8f8f8',
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {tempDates.map(
                    (text, index) => (
                        <ListItem button key={text} onClick={() => setSideBarDate(text)}>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )}
            </List>
        </Box>
    );

    return (
        <div className="Dashboard-Container" style={{ margin: '2rem 0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <React.Fragment key={'left'}>
                    <Button 
                        variant="contained"
                        size="large"
                        style={{
                            background: '#515f71',
                            fontSize: '110%',
                        }}
                        onClick={toggleDrawer('left', true)}
                    >
                        {sideBarDateText}
                    </Button>
                    <SwipeableDrawer
                        anchor={'left'}
                        open={sidebarStatus}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        {sideBarDateList('left')}
                    </SwipeableDrawer>
                </React.Fragment>
            </div>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            component={Link}
                            to="/dashboard/budgeter"
                            style={{
                                background: '#fff580',
                                color: '#14279B',
                                fontSize: '120%',
                            }}
                            endIcon={
                                <CalculateOutlinedIcon fontSize="inherit" />
                            }
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
                            style={{
                                background: '#4c37af',
                                color: '#eeeeee',
                                fontSize: '120%',
                            }}
                            endIcon={
                                <BarChartOutlinedIcon fontSize="inherit" />
                            }
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
