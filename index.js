const express = require("express");
const app = express();
const route = require("./route.js");

app.use("/page", route);

app.listen(3000);
