const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()

const { Client } = require('pg');

const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/34d_juicebox"
);

const getUserById = async (id) => {
  try{
const {rows: [user]} = await client.query(`
  SELECT * FROM users
  WHERE id=$1;
`, [id])
return user;
  } 
  catch(err){
    throw err;
}
}

const createUser = async (username, password) => {
  try{
  const user = await prisma.users.create({
    data: {
      username,
      password
    }
  })

  return user;
  } catch(err) {
  throw err;
}
};

const createPost = async ({ title, content, ownerId }) => {
  try{
  const { 
    rows: [post],
  } = await client.query(
    `
  INSERT INTO posts(title, content, ownerId)
  VALUES ($1, $2, $3)
  RETURNING *;
  `,
[title, content, ownerId]
);

return post;
  } catch(err){
    throw err;
  }
};

const getAllPosts = async () => {
  try{
    const {rows} = await client.query(`
    SELECT * FROM posts;
    `);

    return rows;
  } 
  catch(err) {
    throw err;
  }
};

const deletePost = async (postId) => {
  try{
    const {rows: [post]} = await client.query(
      `
    DELETE FROM posts
    WHERE id=${postId}
    RETURNING *;
    `
  )
  return post;
  } catch(err) {
    throw err;
  }
}



const getAllUsersPosts = async (userId) => {
  try{
    const {rows} = await client.query(`
    SELECT * FROM posts WHERE ownerId=${userId};
    `);

    return rows;
  } 
  catch(err) {
    throw err;
  }
};




module.exports = {
  client,
  createUser,
  createPost,
  getAllPosts,
  getUserById,
  getAllUsersPosts,
  deletePost
}