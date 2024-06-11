import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.image} // Ensure your product data includes image URLs
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Button >Order Now</Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
