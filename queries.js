const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'marc',
  host: 'localhost',
  database: 'ecommerce-app',
  password: '',
  port: 5432
});

const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  });
}

const getCustomerById = (request, response) => {
  pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  });
}

const createCustomer = (request, response) => {
  const { first_name, last_name, email } = request.body;

  pool.query('INSERT INTO customers (first_name, last_name, email) VALUES ($1, $2, $3)', [first_name, last_name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Customer added with ID: ${result.insertId}`);
  })
}

const updateCustomer = (request, response) => {
  const id = parseInt(request.params.id)
  const { first_name, last_name, email } = request.body

  pool.query(
    'UPDATE customers SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',
    [first_name, last_name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Customer modified with ID: ${id}`)
    }
  );
}

const deleteCustomer = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Customer deleted with ID: ${id}`)
  })
}