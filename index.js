const express = require('express');
const app = express();
const port = 3000;
const db = require('./queries');

app.get('/', (req, res) => {
  res.send('Hello world!')
});

app.get('/customers', db.getCustomers);
app.get('/customers/:id', db.getCustomerById);
app.post('/customers', db.createCustomer);
app.put('/customers/:id', db.updateCustomer);
app.delete('/customers/:id', db.deleteCustomer);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

