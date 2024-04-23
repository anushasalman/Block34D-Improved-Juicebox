// Connect to 34d_juicebox database

const { Client } = require('pg');

const client = new Client (process.env.DATABASE_URL || "postgres://localhost:5432/34d_juicebox");

module.exports = {
  client
}