import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Paper, Button, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!name || !price || !quantity) {
      setErrorMessage('All fields are required');
      return;
    }

    const product = { name, price, quantity };
    try {
      await axios.post('http://localhost:9191/addproduct', product);
      console.log('New Product added');
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Paper elevation={3} style={paperStyle}>
      <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
        <u>Add Vehicle</u>
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Vehicle Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mileage"
              variant="outlined"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="secondary" type="submit">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
        {errorMessage && (
          <Typography variant="body2" color="error" style={{ marginTop: '20px', textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}
      </form>
    </Paper>
  );
};

export default AddProduct;
