require("colors");
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errors");

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
  console.log("ERROR: " + err.stack);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

dotenv.config();
const app = express();

app.use(express.json()); //allow accept json data

app.get("/", (req, res) => {
  res.send("server is ready!");
});

//route
app.use("/api/user", userRoutes);

//middleware
app.use(errorMiddleware); //handle error

//connect DB
connectDB().then(() =>
  app.listen(
    PORT,
    console.log(`Server started on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold)
  )
);
