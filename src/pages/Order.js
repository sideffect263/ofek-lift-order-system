import React, { useEffect, useState, useContext } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../components/CartContext';

const Order = () => {
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const { productsCartContext } = useContext(CartContext);

  const location = useLocation();

  useEffect(() => {
    console.log("Order load");
    console.log(productsCartContext);
  }, [productsCartContext]);

  const handleSubmitOrder = () => {
    // Handle order submission logic here
    // Example: Send order data to your API
    axios.post('/path-to-your-api/orders', {
      customerName,
      contact,
      orderDate,
      products: productsCartContext
    })
    .then(response => {
      setOrderStatus('Order submitted successfully!');
      console.log('Order response:', response.data);
    })
    .catch(error => {
      setOrderStatus('Error submitting order.');
      console.error('Error submitting order:', error);
    });
  };

  const renderOrderSummary = () => (
    <List>
      {productsCartContext.map((product, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={product.name}
            secondary={`Quantity: ${product.quantity}, Start Date: ${product.startDate ? new Date(product.startDate).toLocaleDateString() : 'N/A'}, End Date: ${product.endDate ? new Date(product.endDate).toLocaleDateString() : 'N/A'}, Location: ${product.location}`}
          />
        </ListItem>
      ))}
    </List>
  );

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
      <Typography variant="h5" gutterBottom>Order Summary</Typography>
      {renderOrderSummary()}
      <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
        Submit Order
      </Button>
      {orderStatus && <Typography variant="body1">{orderStatus}</Typography>}
    </Container>
  );
};

export default Order;
