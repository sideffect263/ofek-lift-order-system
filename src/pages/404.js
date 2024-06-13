import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './404.css'; // Optional: if you want to add custom styles

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" component="h1">
        404
      </Typography>
      <Typography variant="h6" component="p">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={goHome} style={{ marginTop: '20px' }}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
