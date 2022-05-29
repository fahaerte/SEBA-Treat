const express = require("express");
//const favicon = require('express-favicon');
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();
//app.use(favicon(__dirname + '/build/favicon.ico'));
app.disable("x-powered-by");
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build", "web")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "web", "index.html"));
});

app.listen(port);
