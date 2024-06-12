import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
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
        <Button className='headerButton' color="inherit" component={Link} to="/">
        <Typography variant="h6" style={{color:"white"}}>Home</Typography>
        </Button>
        <Button className='headerButton' color="inherit" component={Link} to="/products">
        <Typography variant="h6" style={{color:"white"}}>Products</Typography>
        </Button>
        <Button className='headerButton' color="inherit" component={Link} to="/order">
        <Typography variant="h6" style={{color:"white"}}>Order</Typography>
        </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};



export default Header;
