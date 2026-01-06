const express = require("express");
const app = express();
const userRoutes = require("./app/routes/user.routes.js");
require("dotenv").config();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/hospital/users", userRoutes);
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});

