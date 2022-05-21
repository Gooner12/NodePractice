const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
// middleware to access json data
app.use(express.json());

// routes
// app.get('/hello', (req, res) => {
//     res.send('Task manager app');
// })

app.use("/api/v1/tasks", tasks);

// middleware for 404 not found cases
app.use(notFound);
app.use(errorHandlerMiddleware); // middleware to handle errors

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
