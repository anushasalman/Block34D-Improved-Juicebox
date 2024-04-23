
require('dotenv').config();
const { createUser, createPost } = require("./index");
const bcrypt = require("bcrypt");


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
console.log("finished creating users");
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

    
    await createUsers();



  }catch(err){
    console.log("Error during rebuildDB");
    throw err;
  }
  };

  rebuildDB();