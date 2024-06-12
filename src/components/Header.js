import React, {useContext} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

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
      <Toolbar style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}>
        <div style={{flex:1,

        }}>

          <img src="https://www.ofeklift.com/wp-content/uploads/2023/06/logo.png" alt="logo" style={{ backgroundColor:'white', borderRadius:20, justifyContent:'center', alignContent:'center', alignItems:'center',borderWidth:2, borderColor:'#283618',borderStyle:'solid',padding:15,
        boxShadow: '0 0 50px 10px rgba(0,0,0,0.4)',
        marginBlock:10,width:"100%"}}/>
      
        </div>
        <div style={{flex:2, borderWidth:2, display:"flex", justifyContent:'flex-end'}}>
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
