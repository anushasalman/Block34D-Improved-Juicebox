const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()

const { Client } = require('pg');

const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/34d_juicebox"
);

// const getUserById = async (id) => {
//   try {
//     const user = await prisma.users.findUnique({
//       where:{
//         id
//       }
//     });

//     return user;
//   }
//   catch (err) {
//     throw err;
//   }
// }


const getUserByUsername = async (username) => {
  try{ 
const user = await prisma.users.findUnique({
  where:{
    username
  }
});
return user;
  }catch(err){
    throw err;
}
}
const createUser = async (username, password) => {
  try {
    const user = await prisma.users.create({
      data: {
        username,
        password
      }
    })

    return user;
  } catch (err) {
    throw err;
  }
};

const createPost = async ({ title, content, ownerId }) => {
  try{
  const post = await prisma.posts.create({
    data: {
      title,
      content,
      ownerId
    }
  })
  return post;
} catch(err) {
  throw err;
}
}

const getAllPosts = async () => {
  try{
    const rows = await prisma.posts.findMany();

    return rows;
  } catch(err) {
    throw err;
  }
};

const deletePost = async (postId) => {
  try{
    const post = await prisma.post.delete({
      where: {
        id: parseInt(postId),
      },
    });
      
  return post;
  } catch(err) {
    throw err;
  }
};



const getAllUsersPosts = async (userId) => {
  try{
    const {rows} = await client.query(`
  SELECT * FROM posts WHERE ownerId = ${ userId };
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
  // getUserById,
  getAllUsersPosts,
  deletePost,
  getUserByUsername
}