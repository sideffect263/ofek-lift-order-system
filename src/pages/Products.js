import React, { useEffect, useState,useContext } from 'react';
import { Container, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, Select, MenuItem, FormControl, InputLabel, Drawer, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import ShoppingCartIcon from '../assets/icons/shoppingCart_icon.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import './products.css';
import DeleteIcon from '../assets/icons/remove.png';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { add } from 'date-fns';
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


  useEffect(() => {
    // Fetch product data from your API or Firebase
    axios.get('/path-to-your-api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);


  const addToCart = (product) => {
    setProductsCartContext([...cart, product]);
    console.log("productsCartContext",productsCartContext)

  };

  useEffect(() => {
    console.log("cart",cart)
    console.log("productsCartContext",productsCartContext)
  }, [cart]);

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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
      />
      <IconButton onClick={toggleDrawer(true)}>
        <img src={ShoppingCartIcon} alt="Shopping Cart" style={{ width: 60, backgroundColor:'#264653', borderRadius:20, zIndex:3, position:"fixed", right:50, top:180 }} />
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
      >
        <DialogTitle>{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%' }} />
              <p>{selectedProduct.description}</p>
              <p>Price: ${selectedProduct.price}</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <label>Start Date:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (endDate && date >= endDate) {
                        setEndDate(null);
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                  />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <label>End Date:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                  />
                </div>
                <label>Duration: <span style={{color:"green"}}>{calculateDuration()}</span> days</label>
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
                  inputProps={{ min: 1 }}
                />
              </div>
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
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, padding: 16 }}>
          <h3>Shopping Cart</h3>
          <List>
            {productsCartContext.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity}, Start Date: ${item.startDate ? item.startDate.toLocaleDateString() : 'N/A'}, End Date: ${item.endDate ? item.endDate.toLocaleDateString() : 'N/A'}, Location: ${item.location}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(index)}>
                    <img src={DeleteIcon} alt="Remove" style={{ width: 24 }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Container>
  );
};

export default Products;
