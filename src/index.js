require("dotenv-safe").load();
var jwt = require('jsonwebtoken');
const movies = require('./api/movies');
const server = require("./server/server");
const repository = require("./repository/repository");

server.start(movies, repository, (err, app) => { 
    console.log("just started");
});