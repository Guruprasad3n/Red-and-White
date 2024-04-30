const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./Config/db");
const ProductRouter = require("./Routes/ProductRoute");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send(
    `<div style="display:flex; align-items:center; justify-content:center; height:98vh">
        <h1 style="text-align:center">Welcome to Red And White</h1>
        </div>`
  );
});
app.use("/api", ProductRouter);

connectDB();
const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
  console.log(`Server Started at Port No http://localhost:${PORT}`);
});
