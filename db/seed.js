require('dotenv').config()
const { client } = require("./index");

// Create a posts table

// Drop any existing tables

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`DROP TABLE IF EXISTS posts`);

    console.log("Finished dropping tables");

  } catch (err) {
    console.log("Error dropping tables");
    throw err;
  }
};

const createTables = async () => {
  try {
    console.log("Starting to create tables...");

    await client.query(`
    CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
    `);

    console.log("Finished creating tables");

  } catch (err) {
    console.log("Error creating tables");
    throw err;
  }
};

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();

    client.end();
  }
  catch (err) {
    console.log("Error during rebuildDB");
    throw err;
  }
};

rebuildDB();