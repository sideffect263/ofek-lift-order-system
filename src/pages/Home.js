import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import './home.css'; // import the CSS file

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Container id="mainly" className="main">
      <Box className="openMessage">
        <Typography variant="h2" className="welcomeText">Welcome to Ofek Lift Order System</Typography>
        <Typography variant="h5" className="descriptionText">
          This is a simple order system for Ofek Lift. You can order products from the "Products" page.
        </Typography>
      </Box>
      <Box className="findLift">
        {isLoading && (
          <Box className="loadingSpinner">
            <Typography variant="h4">Loading...</Typography>
            <Typography variant="h6">If too long, go to https://lift-finder.netlify.app/</Typography>
            <CircularProgress />
          </Box>
        )}
        <iframe
          title="findLift"
          src="https://lift-finder.netlify.app/"
          className="iframeStyle"
          allowTransparency="true"
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </Box>
    </Container>
  );
};

export default Home;
