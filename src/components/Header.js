import React, {useContext} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  const homePressed = () => {
    navigate('/');
  };

  const productsPressed = () => {
    navigate('/products');
  }

  const orderPressed = () => {
    navigate('/order');
  }



  return (
    <AppBar style={{marginTop:25, width:"95%", borderRadius:20, flex:1}} position="static">
      <Toolbar className='toolBar' >

        <div style={{flex:3, display:'flex', justifyContent:'center', alignItems:'center'

        }}>

          <img src="https://www.ofeklift.com/wp-content/uploads/2023/06/logo.png" alt="logo" className='img'/>
      
        </div>
        <div id="hamburger">&#9776;</div>


        <div className='Buttons'>
        <Button className='headerButton' color="inherit" onClick={homePressed}>
        <Typography variant="h6" style={{color:"white"}}>Home</Typography>
        </Button>
        <Button className='headerButton' color="inherit" onClick={productsPressed} >
        <Typography variant="h6" style={{color:"white"}}>Products</Typography>
        </Button>
        <Button className='headerButton' color="inherit" onClick={orderPressed} >
        <Typography variant="h6" style={{color:"white"}}>Order</Typography>
        </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};



export default Header;
