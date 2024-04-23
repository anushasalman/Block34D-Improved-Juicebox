// Connect to 34d_juicebox database

const { Client } = require('pg');

const client = new Client ('postgres://localhost:5432/34d_juicebox');

module.exports = {
  client
}