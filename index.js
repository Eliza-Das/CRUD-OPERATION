const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[];

// let posts=[
//     {
//         id: uuidv4(),
//         username:"Apna college",
//         content:"I love coding!",


//     },
//     {
//         id: uuidv4(),
//         username:"eliza",
//         content:"i love my parents!",
        

//     },
//     {
//         id: uuidv4(),
//         username:"Gudu",
//         content:"I love playing pubg",
        

//     }
// ];

app.get("/posts",(req,res)=>{
  //  res.send("Serving working well ! ");
  res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
  });
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
   // console.log(req.body);
     //res.send("Post request working  ! ");
     res.redirect("/posts");
  });

  app.get("/posts/:id", (req,res)=>{
    let { id } =req.params;
    //console.log(id);
    let post=posts.find((p)=>id==p.id); //to check id is present in our post or not
   //  console.log(post); //print in terminal all details
   res.render("show.ejs",{post});
   // res.send("Request working"); //To show get request woking properly in sever side
  });
  app.patch("/posts/:id",(req,res)=>{
    let { id } =req.params;
    let NewContent=req.body.content;
    let post=posts.find((p)=>id==p.id);
    post.content=NewContent;
    console.log(post)
    // res.send("Patch request working !");
    res.redirect("/posts");

  });
app.get("/posts/:id/edit",(req,res)=>{
    let { id } =req.params;
    let post=posts.find((p)=>id==p.id);
     res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let { id } =req.params;
    posts=posts.filter((p)=>id!==p.id);
    // res.send("Delete successfully");
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`listen to port :${port}`);
});
