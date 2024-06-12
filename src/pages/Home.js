import React, { useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import './home.css'; // import the CSS file

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Container id="mainly" className='main'>
      <div className='openMessage'> 
        <Typography variant="h2" style={{marginTop: 25}}>Welcome to Ofek Lift Order System</Typography>
        <Typography variant="h5" style={{marginTop: 25}}>
          This is a simple order system for Ofek Lift. You can order products from the "Products" page.
        </Typography>
      </div>
      <div className='findLift'>
        {isLoading &&
        <div style={{height:"100%", width:"100%", display:"flex", flexDirection:"column", justifyContent:'center', alignContent:'center', alignItems:'center'}}>
         <CircularProgress style={{flex:1}} />
         <div style={{flex:5}}>
            <Typography variant="h5">Loading...</Typography>
            <Typography variant="body1">Please wait while the Lift Finder is loading.</Typography>
            <Typography variant="body1">If this is taking too long</Typography>
            <Typography variant="body1">you can go to https://lift-finder.netlify.app/.</Typography>
             

         </div>
         </div>
         
         }
         
          {/* Show loading spinner while iframe is loading */}
       {
        <iframe 
          title="findLift"
          src="https://lift-finder.netlify.app/"
          style={{width: '100%', height: '100vh'}}
          allowTransparency="true"
          onLoad={() => setIsLoading(false)} // Set loading to false when iframe has loaded
        />
       }
      </div>
    </Container>
  );
};

export default Home;