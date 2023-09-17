const { log } = require("console");
const exp = require("constants");
const express = require("express");
const path = require("path");
const app = express();
const {v4: uuidv4} = require("uuid");
const port = 7860;
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Gaangu..",
        content: "I am Gaangu..."
    },
    {
        id: uuidv4(),
        username: "Lola..",
        content: "hello apan hai lolla"
    },
    {
        id: uuidv4(),
        username: "Pagle",
        content: "I am Pagle.., Naam to suna hi hoga "
    }
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res)=>{
    res.render("newpost.ejs");
})

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;

    posts.push({id : uuidv4(), username, content});
    
    res.redirect("/posts");
})

app.post("/posts/search", (req, res)=>{
    let {id} = req.body;
    res.redirect(`/posts/search/${id}`);
})

app.get("/posts/search/:id", (req, res) => {
    let {id} = req.params;
    let postsByUser = [];
    for (const post of posts) {
        if(post.id == id || post.username == id ){
            postsByUser.push(post);
        }
    }
    res.render("idposts.ejs", {postsByUser});
})

app.get("/posts/update/:id", (req, res) =>{
    let {id} = req.params;    
    let post = posts.find((p) => id === p.id);

    res.render("updatePost", {id, username: post.username, content: post.content});

})

app.patch("/posts/update/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);

    post.content = newContent;
    
    res.redirect("/posts");
   
})

app.delete("/posts/delete/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
})

app.listen(port, ()=>{console.log("listening on port", port)});
