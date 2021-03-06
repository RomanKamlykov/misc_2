const errors = require('restify-errors');
const Customer = require('../models/Customer');

module.exports = (server) => {
  // Get Customers
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({}); // gets all customers
      res.send(customers);
      next(); // с Restify нужно вызывать next в каждом routes
    } catch (error) {
      return next(new errors.InvalidContentError(error));
    }
  });

  // Get Single Customer
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id); // gets all customers
      res.send(customer);
      next(); // с Restify нужно вызывать next в каждом routes
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });

  // Add Customer
  server.post('/customers', async (req, res, next) => {
    // Check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { name, email, balance } = req.body;
    const customer = new Customer({
      name,
      email,
      balance
    });
    try {
      const newCustomer = await customer.save();
      res.send(201);
      next();
    } catch (error) {
      return next(new errors.InternalError(error.message));
    }
  });

  // Update Customer
  server.put('/customers/:id', async (req, res, next) => {
    // Check for JSON
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    try {
      const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.send(200);
      next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });

  // Delete Customer
  server.del('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findOneAndRemove({ _id: req.params.id });
      res.send(204);
      next();
    } catch (error) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });
}