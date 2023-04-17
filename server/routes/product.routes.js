const ProductController = require('../controllers/product.controller');

module.exports = function(app){
  app.get('/api/products', ProductController.getAllProducts);
  app.get('/api/product/:id', ProductController.getProduct);
  app.post('/api/newproduct', ProductController.createProduct);
  app.put('/api/product/:id', ProductController.updateProduct);
  app.delete('/api/product/:id', ProductController.deleteProduct);
}