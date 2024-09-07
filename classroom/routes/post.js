const express = require("express");
const app = express();
const router =express.Router();



//Get
router.get('/', (req, res) => {
    res.send("Get for posts");
  });
//Show

router.get('/:id', (req, res) => {
    res.send("Show for posts id");
  });

//Post

router.post('/', (req, res) => {
    res.send(" post  for posts");
  });
//delete
router.delete('/:id', (req, res) => {
    res.send("Delet  for posts id");
  });


  module.exports = router;