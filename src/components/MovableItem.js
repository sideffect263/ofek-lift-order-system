// MovableItem.js
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovableItem = ({ item }) => {
  useEffect(() => {
    console.log('item:', item);
  }, [item]);

  const navigate = useNavigate();

  const buttonPressed = () => {
    console.log("Button Pressed");
    console.log(item.id);
    if (item.id === "Home") {
      navigate('/');
    }
    if (item.id === "Products") {
      navigate('/products');
    }
    if (item.id === "Order") {
      navigate('/order');
    }
    if (item.id === "Lift-game") {
      navigate('/lift-game');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${item.x}px`,
        top: `${item.y}px`,
        zIndex: item.isLifted ? 100 : 15,
      }}
    >
      <Button
        onClick={buttonPressed}
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          borderWidth: '0.8px',
          borderColor: 'white',
          borderStyle: 'solid',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          '&:active': {
            boxShadow: 'none',
            transform: 'scale(0.98)',
          },
        }}
      >
        {item.id}
      </Button>
    </div>
  );
};

export default MovableItem;
