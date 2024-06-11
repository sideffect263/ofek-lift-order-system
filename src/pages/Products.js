import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, Select, MenuItem, FormControl, InputLabel, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import ShoppingCartIcon from '../assets/icons/shoppingCart_icon.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a description of product 1',
      price: 100,
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description of product 2',
      price: 200,
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description of product 3',
      price: 300,
      image: 'https://via.placeholder.com/300',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Fetch product data from your API or Firebase
    axios.get('/path-to-your-api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddToCart = () => {
    const item = {
      ...selectedProduct,
      startDate,
      endDate,
      location,
      quantity,
    };
    setCart([...cart, item]);
    setDialogOpen(false);
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
      />
      <IconButton onClick={toggleDrawer(true)} >
        <img src={ShoppingCartIcon} alt="Shopping Cart" style={{ width: 60, backgroundColor:'#264653', borderRadius:20, position:"fixed", right:50, top:180 }} />
      </IconButton>
      <Grid container spacing={3}>
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Button onClick={() => handleProductClick(product)}>
              <ProductCard product={product} />
            </Button>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Slide}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          <img src={selectedProduct?.image} alt={selectedProduct?.name} style={{ width: '100%' }} />
          <p>{selectedProduct?.description}</p>
          <p>Price: ${selectedProduct?.price}</p>
          {/* Start Date Picker */}
          <div>
            <label>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
            />
          </div>
          {/* End Date Picker */}
          <div>
            <label>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
            />
          </div>
          {/* Location Picker */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              labelId="location-label"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="north">North</MenuItem>
              <MenuItem value="middle">Middle</MenuItem>
              <MenuItem value="south">South</MenuItem>
            </Select>
          </FormControl>
          {/* Quantity Picker */}
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1 }}
          />
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
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, padding: 16 }}>
          <h3>Shopping Cart</h3>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity}, Start Date: ${item.startDate ? item.startDate.toLocaleDateString() : 'N/A'}, End Date: ${item.endDate ? item.endDate.toLocaleDateString() : 'N/A'}, Location: ${item.location}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Container>
  );
};

export default Products;
