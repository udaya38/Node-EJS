const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const app=express()
const _=require("lodash")
const mongoose = require('mongoose');
mongoose.connect('Database connection URL', {useNewUrlParser: true, useUnifiedTopology: true});
const postSchema = {

 title: String,

 content: String

};

const Post = mongoose.model("Post", postSchema);
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))
//var posts=[];
const setfunction="Hi friends, the webpage you are currently seeing is developed using node js(express framework),database: Mongodb. Please rate my work :)";
const aboutfunction="Welcome to the about page";
const contactfunction="+91-9176534895";
app.get("/",(req,res)=>
{
  Post.find({}, function(err, posts){

     res.render("home", {

       startingContent: setfunction,

       posts: posts

       });

   })
})

app.get("/about",(req,res)=>
{
  res.render("about")
})

app.get("/contact",(req,res)=>
{
  res.render("contact",{contactfunc:contactfunction, Goodname: "Contact"})
})

app.get("/compose",(req,res)=>
{
  res.render("compose")
})

app.post("/goto",(req,res)=>
{
   let tit=req.body.postTitle;
   console.log(tit+" "+"hgha");
   if(tit == "")
   {
     res.redirect("/");
   }
   else {
     const post = new Post ({

      title: req.body.postTitle,

      content: req.body.postBody

    });
    post.save();
     res.redirect("/");
   }

})

app.get("/posti/:postName",(req,res)=>
{
  const requestedPostId = req.params.postName;


  console.log(requestedPostId);
  Post.findOne({title: requestedPostId}, function(err, post){
    console.log(post);
   res.render("posting", {

     title: post.title,

     content: post.content

   });

 });

});

app.get("/del/:delName",(req,res)=>
{
  const requested = req.params.delName;



Post.deleteOne({title: requested}, function(err, post){
    console.log(post);
    res.redirect("/");

 });

});

app.listen("4000",() =>
{
  console.log("The port is listening 4000");
})
