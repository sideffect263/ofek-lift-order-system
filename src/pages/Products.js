import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Grid, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Slide, Select, MenuItem, FormControl,
  InputLabel, Drawer, IconButton, List, ListItem, ListItemText,
  ListItemSecondaryAction, Box, Chip, Typography
} from '@mui/material';
import ShoppingCartIcon from '../assets/icons/shoppingCart_icon.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import './products.css';
import DeleteIcon from '../assets/icons/remove.png';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import VData from '../components/VData';

const Products = () => {
  const [products, setProducts] = useState(VData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { productsCartContext, setProductsCartContext } = useContext(CartContext);
  const tags = ["זרוע טלסקופית ישרה", "Genie", "JLG", "ממונע", "חשמלי", "פתוח", "שטח מפולס ישר", "זרוע מפרקית", "Manitou", "מייצבים", "אנכית"];

  useEffect(() => {
    axios.get('/path-to-your-api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.vehicleType.toLowerCase().includes(lowercasedQuery) ||
        product.engType.toLowerCase().includes(lowercasedQuery) ||
        product.workLocation.toLowerCase().includes(lowercasedQuery) ||
        product.brand.toLowerCase().includes(lowercasedQuery) ||
        product.workHeight === searchQuery
      )
    );
  }, [searchQuery, products]);

  const addToCart = (product) => {
    setProductsCartContext([...productsCartContext, product]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setStartDate(null);
    setEndDate(null);
    setLocation('');
    setQuantity(1);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    setProductsCartContext(productsCartContext.filter((_, i) => i !== index));
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return null;
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddToCart = () => {
    if (!startDate || !endDate || !location || !quantity) {
      alert('Please fill in all fields');
      return;
    }
    const item = {
      ...selectedProduct,
      startDate,
      endDate,
      location,
      quantity,
    };
    setCart([...cart, item]);
    addToCart(item);
    handleCloseDialog();
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Container>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        inputProps={{ role: 'searchbox' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onClick={() => setSearchQuery(tag)}
            sx={{ cursor: 'pointer' }}
            color="primary"
            variant="outlined"
            style={{ fontSize: '1.1rem' }}
          />
        ))}
      </Box>
      <IconButton onClick={toggleDrawer(true)}>
        <img src={ShoppingCartIcon} alt="Shopping Cart" className="shopping-cart-icon" />
      </IconButton>
      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Button onClick={() => handleProductClick(product)} style={{ width: '100%' }}>
              <ProductCard product={product} />
            </Button>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Slide}
        onClose={handleCloseDialog}
        aria-labelledby="product-dialog-title"
      >
        <DialogTitle id="product-dialog-title">{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%' }} />
              <Typography variant="body1" component="p">{selectedProduct.description}</Typography>
              <Typography variant="h6" component="p">Price: ${selectedProduct.price}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <label htmlFor="start-date">Start Date:</label>
                  <DatePicker
                    id="start-date"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (endDate && date >= endDate) {
                        setEndDate(null);
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                    placeholderText="Select start date"
                    
                  />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <label htmlFor="end-date">End Date:</label>
                  <DatePicker
                    id="end-date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                    placeholderText="Select end date"
                  />
                </Box>
                <Typography variant="body1" component="span">Duration: <span style={{ color: "green" }}>{calculateDuration()}</span> days</Typography>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                    labelId="location-label"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    label="Location"
                  >
                    <MenuItem value="north">North</MenuItem>
                    <MenuItem value="middle">Middle</MenuItem>
                    <MenuItem value="south">South</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  fullWidth
                  margin="normal"
                  inputProps={{ min: 1, role: 'spinbutton' }}
                />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleAddToCart} color="primary">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} aria-labelledby="shopping-cart-drawer">
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" id="shopping-cart-drawer">Shopping Cart</Typography>
          <List>
            {productsCartContext.map((item, index) => (
              <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(index)}>
                    <img src={DeleteIcon} alt="Remove" style={{ width: 24 }} />
                  </IconButton>
                </Box>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Typography variant="body2">Start Date: {item.startDate ? item.startDate.toLocaleDateString() : 'N/A'}</Typography>
                <Typography variant="body2">End Date: {item.endDate ? item.endDate.toLocaleDateString() : 'N/A'}</Typography>
                <Typography variant="body2">Location: {item.location}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Container>
  );
};

export default Products;
