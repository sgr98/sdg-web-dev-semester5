import React, { useState } from 'react';
import { 
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Menu
} from '@mui/material';

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

const ModalGroupDropdown = ({
    tempTransaction,
    setTempTransaction,
}) => {
    const [groupAnchorEl, setGroupAnchorEl] = useState(null);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
    const open = Boolean(groupAnchorEl);

    const handleClickListItem = (event) => {
        setGroupAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedGroupIndex(index);
        setGroupAnchorEl(null);
        setTempTransaction({ ...tempTransaction, group: groupOptions[selectedGroupIndex] })
    };

    const handleClose = () => {
        setGroupAnchorEl(null);
    };

    return (
        <div>
            <List
                component="nav"
                aria-label="Group List"
            >
                <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="device-locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{ border: '1px solid #111', borderRadius: '5px' }}
                >
                <ListItemText
                    primary={'Group: ' + groupOptions[selectedGroupIndex]}
                />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={groupAnchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {groupOptions.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedGroupIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ModalGroupDropdown;