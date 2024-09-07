const express = require("express");
const app = express();
const router =express.Router();


//Get
router.get('/users', (req, res) => {
    res.send("Get for users");
  });
//Show

router.get('/users/:id', (req, res) => {
    res.send("Show for users id");
  });

//Post

router.post('/users', (req, res) => {
    res.send(" post  for users");
  });
//delete
router.delete('/users/:id', (req, res) => {
    res.send("Delet  for users id");
  });

module.exports = router;