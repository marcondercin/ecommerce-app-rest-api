const express = require('express');
const app = express();
const port = 3000;
const db = require('./queries');

const usersRouter = require('./users.js');
const registerRouter = require('./register.js');

app.get('/', (req, res) => {
  res.send('Hello world!')
});

app.use('/users', usersRouter);
app.use('/register', registerRouter);

// app.get('/customers', db.getCustomers);
// app.get('/customers/:id', db.getCustomerById);
// app.post('/customers', db.createCustomer);
// app.put('/customers/:id', db.updateCustomer);
// app.delete('/customers/:id', db.deleteCustomer);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

