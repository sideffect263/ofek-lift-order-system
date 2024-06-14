import React, { useEffect, useState, useContext } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../components/CartContext';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet';

const Order = () => {
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const { productsCartContext } = useContext(CartContext);

  const handleSubmitOrder = () => {
    const templateParams = {
      to_name: "ariel",
      to_email: ["arielbiton03@gmail.com"],
      message: `Order Details: ${JSON.stringify(productsCartContext)}`,
      // Add more parameters based on your template setup
    };
  
    emailjs.send('service_tna4jyq', 'template_tnxjp0c', templateParams, '4STl-GlRs-mGNGOoK')
      .then(response => {
        console.log('Email successfully sent!', response.status, response.text);
        setOrderStatus('Order submitted and email sent successfully!');
      }, (err) => {
        console.error('Failed to send email. Error: ', err);
        setOrderStatus('Failed to send email.');
      });
  };

  useEffect(() => {
    console.log("Order load");
    console.log(productsCartContext);
  }, [productsCartContext]);

  
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
    <Container style={{marginTop:20, marginBottom:40}}>
       <Helmet>
        <title>Order - Send and email</title>
        <meta name="description" content="
        Place an order with Ofek Lift today. Explore our product range and place your orders efficiently. 
        " />
      </Helmet>
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
