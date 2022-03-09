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

  pool.query('INSERT INTO customers (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, email], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
      throw error
    }
    response.status(201).send(`Customer added with ID: ${results.rows[0].id}`);
  });
}

const updateCustomer = (request, response) => {
  const id = parseInt(request.params.id)
  const { first_name, last_name, email } = request.body

  pool.query(
    'UPDATE customers SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *',
    [first_name, last_name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      if (typeof results.rows == 'undefined') {
        response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
        response.status(404).send(`Customer not found.`);
      } else {
        response.status(200).send(`Customer modified with ID: ${id}`);
      }
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

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};