import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const Home = () => {
  const paperStyle = { padding: '20px', margin: '20px 0' };
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9191/products');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={paperStyle}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Vehicle Management System
        </Typography>
        <Typography variant="body1" paragraph>
          This application allows you to manage vehicles efficiently. You can add, update, delete, and search for vehicles. Use the navigation buttons above to get started.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Featured Vehicles
        </Typography>
        <Grid container spacing={2}>
          {featuredProducts.length > 0 ? (
            featuredProducts.slice(0, 3).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Paper elevation={1} sx={{ padding: '10px' }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1">Price: {product.price}</Typography>
                  <Typography variant="body1">Mileage(Kmpl): {product.quantity}</Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No featured Vehicles available.</Typography>
          )}
        </Grid>
      </Paper>
      <Paper elevation={3} sx={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Quick Links
        </Typography>
        <Button component={Link} to="/products" variant="contained" color="primary" sx={{ margin: '5px' }}>
          View Vehicles
        </Button>
        <Button component={Link} to="/add" variant="contained" color="primary" sx={{ margin: '5px' }}>
          Add Vehicles
        </Button>
        <Button component={Link} to="/search" variant="contained" color="primary" sx={{ margin: '5px' }}>
          Search Vehicle
        </Button>
      </Paper>
      <Paper elevation={3} sx={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">Email: u@gmail.com</Typography>
        <Typography variant="body1">Phone: +1 234 567 890</Typography>
      </Paper>
      <Paper elevation={3} sx={paperStyle}>
        <Typography variant="h5" gutterBottom>
          User Testimonials
        </Typography>
        <Typography variant="body1">
          "This Vehicle management system is incredibly easy to use and has streamlined our operations." - Jane 
        </Typography>
        <Typography variant="body1">
          "A must-have tool for managing vehicles efficiently. Highly recommended!" - John 
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
