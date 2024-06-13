import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const cart = useContext(CartContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const homePressed = () => {
    navigate('/');
  };

  const productsPressed = () => {
    navigate('/products');
  }

  const orderPressed = () => {
    navigate('/order');
  }

  const menuItems = [
    { text: 'Home', onClick: homePressed },
    { text: 'Products', onClick: productsPressed },
    { text: 'Order', onClick: orderPressed }
  ];

  return (
    <>
      <AppBar id="toolBAR" className="appBar" position="static">
        <Toolbar  className='toolBar'>
          <Box className="logo-container">
            <img src="https://www.ofeklift.com/wp-content/uploads/2023/06/logo.png" alt="logo" className='img' onClick={homePressed} />
          </Box>
          <Box className="menu-button-container">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} className="menu-button">
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className="buttons-container">
            {menuItems.map((item, index) => (
              <Button key={index} className='headerButton' color="inherit" onClick={item.onClick}>
                <Typography variant="h6" className="buttonText">{item.text}</Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={item.onClick}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
