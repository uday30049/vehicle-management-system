import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Paper, Button, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';

const EditProduct = () => {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9191/productbyid/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setQuantity(response.data.quantity);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty
    if (!name || !price || !quantity) {
      setErrorMessage('All fields are required');
      return;
    }

    const productData = { id, name, price, quantity }; // Include the id in the data
    try {
      await axios.put('http://localhost:9191/update', productData); // Send data without appending id to the URL
      console.log('Product updated');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Paper elevation={3} style={paperStyle}>
      <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
        <u>Edit Vehicle</u>
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
                Update
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

export default EditProduct;
