import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('product');

  const handleOrderSubmit = () => {
    // Handle order submission logic
    axios.post('/path-to-your-api/orders', { productId, customerName, contact, orderDate })
      .then(response => setOrderStatus('Order placed successfully!'))
      .catch(error => setOrderStatus('Error placing order. Please try again.'));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Place an Order</Typography>
      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Information"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Order Date"
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
        Submit Order
      </Button>
      {orderStatus && <Typography variant="body1">{orderStatus}</Typography>}
    </Container>
  );
};

export default Order;
