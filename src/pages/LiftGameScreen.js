import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import LiftGame from '../components/LiftGame';
import './LiftGameScreen.css';

const LiftGameScreen = () => {
  useEffect(() => {
    // Disable scrolling on the body
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Container style={{}}>
      <LiftGame />
    </Container>
  );
};

export default LiftGameScreen;