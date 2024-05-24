import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

const SearchProduct = () => {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [searchName, setSearchName] = useState('');
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:9191/productbyname/${searchName}`);
      setProduct(response.data);
      setErrorMessage('');
    } catch (error) {
      setProduct(null);
      setErrorMessage('Song not found. Please try again.');
      console.error('Error searching for song:', error);
    }
  };

  return (
    <Paper elevation={3} style={paperStyle}>
      <Typography variant="h4" gutterBottom style={{ color: 'blue' }}>
        <u>Search Vehicle by Name</u>
      </Typography>
      <TextField
        label="Vehicle Name"
        variant="outlined"
        fullWidth
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        sx={{ marginBottom: '20px' }}
      />
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginRight: '10px' }}>
          Search
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setSearchName('')}>
          Clear
        </Button>
      </Box>
      {product && (
        <Paper elevation={6} style={{ margin: '20px 0', padding: '15px', textAlign: 'left' }}>
          
          <Typography variant="body1"><strong>Name:</strong> {product.name}</Typography>
          <Typography variant="body1"><strong>Price:</strong> {product.price}</Typography>
          <Typography variant="body1"><strong>Mileage(Kmpl):</strong> {product.quantity}</Typography>
        </Paper>
      )}
      {errorMessage && (
        <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default SearchProduct;
