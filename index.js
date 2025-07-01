const express = require('express');
const app = express();

// Logger middleware
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
  });
  
//JSON parser
app.use(express.json());

//Auth middleware
const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
  
    if (!apiKey || apiKey !== '54321') {
      return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
    }
  
    next();
  };
//Validation middleware
const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
  
    if (
      !name || typeof name !== 'string' ||
      !description || typeof description !== 'string' ||
      typeof price !== 'number' ||
      !category || typeof category !== 'string' ||
      typeof inStock !== 'boolean'
    ) {
      return next(new ValidationError('Invalid product data'));
    }
  
    next();
  };
  

//Product data
let products = [
  {
    id: 1,
    name: 'Moringa Oil',
    description: 'Organic hair and skin oil',
    price: 200,
    category: 'Health & Beauty',
    inStock: true
  },
  {
    id: 2,
    name: 'Stone bracelet',
    description: 'Aesthetic handmade jewelry',
    price: 150,
    category: 'Jewelry',
    inStock: false
  }
];

//Custom Error Classes
class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.status = 404;
    }
  }
  
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.status = 400;
    }
  }
  

//ROUTES
//GET all products
app.get('/api/products', (req, res) => {
    try {
      let { category, page = 1, limit = 10 } = req.query;
  
      let filtered = [...products];
  
      //By category
      if (category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
  
      //page and limit
      page = parseInt(page);
      limit = parseInt(limit);
      const start = (page - 1) * limit;
      const end = start + limit;
  
      const paginated = filtered.slice(start, end);
  
      res.json({
        total: filtered.length,
        page,
        limit,
        results: paginated
      });
    } catch (err) {
      next(err);
    }
  });
  

//GET product by ID
app.put('/api/products/:id', authenticate, validateProduct, (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const product = products.find(p => p.id === id);
      if (!product) throw new NotFoundError('Product not found');
  
      Object.assign(product, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });
  
  
  

//POST create a new product
app.post('/api/products', authenticate, validateProduct, (req, res, next) => {
    try {
      const newProduct = {
        id: products.length + 1,
        ...req.body
      };
      products.push(newProduct);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  });
  
//PUT update a product
app.put('/api/products/:id', authenticate, validateProduct, (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const product = products.find(p => p.id === id);
      if (!product) throw new NotFoundError('Product not found');
  
      Object.assign(product, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });
  

//DELETE a product
app.delete('/api/products/:id', authenticate, (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const index = products.findIndex(p => p.id === id);
      if (index === -1) throw new NotFoundError('Product not found');
  
      const deleted = products.splice(index, 1);
      res.json(deleted[0]);
    } catch (err) {
      next(err);
    }
  });

  //search product by name
  app.get('/api/products/search', (req, res, next) => {
    try {
      const { name } = req.query;
      if (!name) return res.status(400).json({ error: 'Search term is required' });
  
      const results = products.filter(p =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
  
      res.json({
        total: results.length,
        results
      });
    } catch (err) {
      next(err);
    }
  });

  //stats route
  app.get('/api/products/stats', (req, res, next) => {
    try {
      const stats = {};
  
      products.forEach(p => {
        const cat = p.category;
        stats[cat] = (stats[cat] || 0) + 1;
      });
  
      res.json({
        totalProducts: products.length,
        countByCategory: stats
      });
    } catch (err) {
      next(err);
    }
  });
  
  
  

//Start server
app.listen(3000, () => {
  console.log('Products API running on http://localhost:3000/api/products');
});
