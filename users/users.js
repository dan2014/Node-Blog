const express = require("express");
const userDB = require('../data/helpers/userDB.js');
const postDB = require('../data/helpers/postDB.js');
const router = express.Router();


function uppercase(req,res,next){
    const {name} = req.body;
    if(!name){
        res.status(400).json({ errorMessage: "Please provide a name" });
    } else if(name[0]===name[0].toLowerCase()){
        res.status(400).json({ errorMessage: "Please capitalize the name" });
    } else {
        next()
    }
} 
///////////////////////
// GET
router.get("/", async (req,res) => {
    try {
        const users =  await userDB.get()
        if(users){
            res.status(200).json(users);
        } else {
            console.log("Users requested were not found")
            res.status(404).send({ message: `The users requested were not found` })
        }
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }
})

router.get("/:id", async (req,res) => {
    const id = req.params.id
    try {
        const users =  await userDB.get(id)
        const usersPosts =  await userDB.getUserPosts(id)
        if(users && usersPosts){
            res.status(200).json({user:users,posts:usersPosts});
        } else {
            console.log("Users were not found")
            res.status(404).send({ message: `The posts requested were not found or do not exist` })
        }
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }
})

///////////////////////
// POST

//Create new user
router.post("/create", uppercase, async (req,res) => {
    try {
        const newUser =  await userDB.insert(req.body)
        console.log(newUser)
        res.status(201).json(newUser);
    } catch {
        res.status(500).json({error:"User could not be added" });
    }
})

//Edit user name
router.put("/:id", uppercase, async (req,res) => {
    const id = req.params.id
    try {
        const newUser =  await userDB.update(id,req.body)
        console.log(newUser)
        res.status(200).json(newUser);
    } catch {
        res.status(500).json({error:"User could not be edited" });
    }
})

//Delete user
router.delete("/:id", async (req,res) => {
    const id = req.params.id
    try {
        const newUser =  await userDB.remove(id)
        console.log(newUser)
        res.status(200).json(newUser);
    } catch {
        res.status(500).json({error:"User could not be deleted" });
    }
})

//Create user post
router.post("/:id/newpost", async (req,res) => {
    const id = req.params.id
    req.body.userId = id;
    console.log(req.body)
    try {
        const newUser =  await postDB.insert(req.body)
        console.log(newUser)
        res.status(201).json(newUser);
    } catch {
        res.status(500).json({error:`Post for userID:${id} could not be added`});
    }
})

module.exports = router;