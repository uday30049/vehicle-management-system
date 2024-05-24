import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

const ProductList = () => {
  const paperStyle = { padding: '20px', margin: '20px auto' };
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9191/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9191/delete/${id}`);
      console.log('Product deleted');
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Vehicles</h1>
      {products.map((product) => (
        <Paper elevation={3} style={paperStyle} key={product.id}>
         
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <p>Mileage(Kmpl): {product.quantity}</p>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to={`/edit/${product.id}`}
            sx={{ marginRight: '10px' }}  // Adding margin to the right
          >
            Edit
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </Button>
        </Paper>
      ))}
    </div>
  );
};

export default ProductList;
