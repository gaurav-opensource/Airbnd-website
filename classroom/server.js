const express = require("express");
const app = express();
const users = require("./routes/user.js");
const  posts = require("./routes/post.js");
const cookieParser = require('cookie-parser')

app.use(cookieParser());



app.get("/getcookeis",(req,res)=>{
  res.cookie("greed", "hello")
  res.send("send cookies");
})

app.get("/",(req,res)=>{
  console.log(req.cookies);
    res.send("Hello World");
});

app.use("/users", users);
app.use("/posts", posts);


//posts

//Get
app.get('/posts', (req, res) => {
    res.send("Get rout rout");
  });
//Show

  app.get('/posts/:id', (req, res) => {
    res.send("Show rout");
  });

//Post

  app.post('/posts', (req, res) => {
    res.send(" post rout rout");
  });
//delete
  app.delete('/posts/:id', (req, res) => {
    res.send("Delet rout");
  });




app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");
});