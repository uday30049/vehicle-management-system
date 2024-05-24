import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

const Product = () => {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const product = { name, price, quantity };
    try {
      if (selectedProduct) {
        // Update product
        const response = await axios.put(`http://localhost:9191/update`, { id: selectedProduct.id, ...product });
        console.log('Product updated');
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === selectedProduct.id ? response.data : p))
        );
      } else {
        // Add new product
        const response = await axios.post('http://localhost:9191/addproduct', product);
        console.log('New Product added');
        setProducts((prevProducts) => [...prevProducts, response.data]);
      }
      // Reset form fields after successful submission
      setName('');
      setPrice('');
      setQuantity('');
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9191/delete/${id}`);
      console.log('Product deleted');
      // Update the state to remove the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:9191/productbyname/${searchName}`);
      setProducts([response.data]);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  const handleSelectProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setSelectedProduct(product);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9191/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Paper elevation={3} sx={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>{selectedProduct ? 'Update Product' : 'Add Product'}</u>
        </h1>
        <form noValidate autoComplete="off">
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Product Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="Product Quantity"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleAddOrUpdate}>
            {selectedProduct ? 'Update' : 'Submit'}
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={paperStyle}>
        <h1>Search Product by Name</h1>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Paper>

      <h1>Products</h1>
      <Paper elevation={3} sx={paperStyle}>
        {products.map((product) => (
          <Paper elevation={6} sx={{ margin: '10px', padding: '15px', textAlign: 'left' }} key={product.id}>
            Id: {product.id}<br />
            Name: {product.name}<br />
            Price: {product.price}<br />
            Quantity: {product.quantity}<br />
            <Button variant="contained" color="secondary" onClick={() => handleSelectProduct(product)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default Product;
