const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors")
var path = require('path');
const usersRoute = require("./users/users")
const postsRoute = require("./posts/posts")

const server = express();
const port = 5000;
///////////////////////
// Middleware

server.use(morgan("short"));
server.use(helmet());
server.use(express.json());
server.use(cors());

///////////////////////
// Routes
server.get("/",(req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

server.use("/users",usersRoute)
server.use("/posts",postsRoute)

server.listen(port,() => console.log(`The server is listening on port ${port}`))