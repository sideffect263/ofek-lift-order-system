import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import './home.css';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Container component="main" id="mainly" className="main">
      <Helmet>
        <title>Ofek Lift Store</title>
        <meta name="description" content="Start your order with Ofek Lift today. Explore our product range and place your orders efficiently." />
      </Helmet>
      <Box component="section" className="openMessage">
        <Typography variant="h2" className="welcomeText">Welcome to Ofek Lift Order System</Typography>
        <Typography variant="h5" className="descriptionText">
          This is a simple order system for Ofek Lift. You can order products from the "Products" page.
        </Typography>
      </Box>
      <Box component="section" className="findLift">
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
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </Box>
    </Container>
  );
};

export default Home;
