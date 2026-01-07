const express = require("express");
const app = express();
const userRoutes = require("./app/routes/user.routes.js");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors())
// app.use(cors({ origin: 'http://localhost:5173' })); // Vite default port is 5173
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/hospital/users", userRoutes);
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});