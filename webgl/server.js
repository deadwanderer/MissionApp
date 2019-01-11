var path = require("path");
var express = require("express");
var http = require("http");
var app = express();

var PORT = 9000;
var STATIC_PATH = path.join(__dirname, "public");
app.use(express.static(STATIC_PATH));

var server = http.createServer(app);

server.listen(PORT);
console.log("Server is now listening on port " + PORT);