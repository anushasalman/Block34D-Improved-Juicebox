
require('dotenv').config();
const { client, createUser, createPost } = require("./index");
const bcrypt = require("bcrypt");


const dropTables = async () => {
  try {
    console.log("STARTING TO DROP TABLES...");

    await client.query(`DROP TABLE IF EXISTS posts`);
    await client.query(`DROP TABLE IF EXISTS users`);

    console.log("FINISHED DROPPING TABLES");

  } catch (err) {
    console.log("Error dropping tables");
    throw err;
  }
}

const createTables = async () => {
  try{
    console.log("STARTING TO CREATE TABLES...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    );
    
    CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      title TEXT,
      content TEXT,
      addedBy INTEGER REFERENCES users(id)
    );
    `);

    console.log("FINISHED CREATING TABLES");

  } catch(err){
    console.log("Error creating tables");
    throw err;
  }
};

const createUsers = async () => {
  try{
    console.log("Starting to create users...");
    const anusha = await createUser("Anusha", await bcrypt.hash("Salman", 10));
    const sabeen = await createUser("Sabeen", await bcrypt.hash("Abbasi", 10));
    const noor = await createUser("Noor", await bcrypt.hash("abc", 10));

  }catch(err){
    console.log("Error creating users");
    throw err;
  }

}

const createPosts = async () => {
try {
  console.log("starting to create posts");
  const newYork = await createPost({title: "New York", content: "Best thin crust ever"});
  const chicago = await createPost({title: "Chicago", content: "Best deep dish ever"});
  const california = await createPost({title: "California", content: "Best beaches ever"});

}catch(err){
  console.log("Error creating posts");
  throw err;
}
console.log("finished creating posts");
}

const rebuildDB = async () => {
  try{
    client.connect();

    await dropTables();
    await createTables();
    await createUsers();
    await createPosts();

    client.end();
  }catch(err){
    console.log("Error during rebuildDB");
    throw err;
  }
  };

  rebuildDB();