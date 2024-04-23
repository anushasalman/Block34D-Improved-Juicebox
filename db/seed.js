
require('dotenv').config();
const { createUser, createPost } = require("./index");
const bcrypt = require("bcrypt");

const users = [];

const createUsers = async () => {
  try {
    console.log("Starting to create users...");
    const anusha = await createUser("Anusha", await bcrypt.hash("Salman", 10));
    const sabeen = await createUser("Sabeen", await bcrypt.hash("Abbasi", 10));
    const noor = await createUser("Noor", await bcrypt.hash("abc", 10));

    users.push(anusha);
    users.push(sabeen);
    users.push(noor);

    console.log("finished creating users");

  } catch (err) {
    console.log("Error creating users");
    throw err;
  }
}

const createPosts = async () => {
  console.log("Starting to create users...");
  try {
    // console.log("starting to create posts");
    const newYork = await createPost({
      title: "New York",
      content: "Best thin crust ever",
      ownerId: users[0].id
    });
    const chicago = await createPost({
      title: "Chicago", 
      content: "Best deep dish ever",
      ownerId: users[1].id
    });
    const california = await createPost({ 
      title: "California", 
      content: "Best beaches ever", 
      ownerId: users[2].id
    });
    console.log("finished creating posts");
  } catch (err) {
    console.log("Error creating posts");
    throw err;
  }
}

const rebuildDB = async () => {
  try {


    await createUsers();
    await createPosts();


  } catch (err) {
    console.log("Error during rebuildDB");
    throw err;
  }
};

rebuildDB();