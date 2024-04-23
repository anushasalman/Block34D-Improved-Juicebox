const express = require("express");
const { client } = require("./db")

const app = express();
const PORT = 8080;

client.connect();

app.get("/", (req, res) => {
  res.send(`<h1>Juicebox improved</h1>`)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});