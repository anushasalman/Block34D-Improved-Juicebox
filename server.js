require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { client } = require("./db");
const apiRouter = require('./api');

const app = express();
const PORT = process.env.PORT || 8080;

client.connect();

app.use(morgan('dev'));

// Parses body if it is url encoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse body if it is in json form
app.use(bodyParser.json())

app.use((req, res, next) => {

  console.log("<___BODY LOGGER START___>");
  console.log(req.body);
  console.log("<___BODY LOGGER END___>");
  next();
});


app.use('/api', apiRouter);


app.get("/", (req, res) => {
  res.send(`Juicebox 34d`);
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});