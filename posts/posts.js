const express = require("express");
const postDB = require('../data/helpers/postDB.js');

const router = express.Router();

///////////////////////
// GET
router.get("/",async(req,res) => {

    try {
        const posts =  await postDB.get()
        res.status(200).json(posts);
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }

})

router.get("/:id",async(req,res) => {
    const id = req.params.id
    try {
        const posts =  await postDB.get(id)
        if(posts){
            res.status(200).json(posts);
        } else {
            console.log("Users were not found")
            res.status(404).send({ message: `The posts requested were not found or do not exist` })
        }
    } catch {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    }

})

module.exports = router;