//Making a RESTful API

const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const wikiSchema = {
    title : String,
    content : String
}

const Article = mongoose.model("Article", wikiSchema);



//-----------------------------Requests targeting all articles without using route method in express------------------------------//

// //Tackling a get request 
// app.get("/articles", function(req,res){
//     async function getArticles(){
//         let foundArticles = await Article.find({});
//         return foundArticles;
//     };
    
//     let a = getArticles();
//     a.then((value)=>{
//         res.send(value);
//     })
//     // console.log(a);
//     // res.send(a.value);
// })

// //Tackling a post request
// //Post request was made using Postman
// app.post("/articles", function(req, res) {
//     // console.log(req.body.title);
//     // console.log(req.body.content);
//     const article = new Article({
//         title: req.body.title,
//         content: req.body.content
//     })

//     article.save();
// })

// //Tackling a delete request
// //Delete request using Postman
// app.delete("/articles", function(req, res) {
//     async function deleting() {
//         let deletedobj = await Article.deleteMany({title:"Jack Baueur"});
//         return deletedobj.deletedCount;
//     }

//     const numberofelementsdeleted = deleting();
//     console.log(numberofelementsdeleted);
    
// });

//Using app.route from express



//-----------------------------------------Requests targeting all articles------------------------------------------------//
app.route("/articles")
    .get(function(req, res) {
        async function getArticles(){
            let foundArticles = await Article.find({});
            return foundArticles;
        };
        
        let a = getArticles();
        a.then((value)=>{
            res.send(value);
        })
    })
    .post(function(req, res) {
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        })
    
        article.save();
    })
    .delete(function(req, res) {
        async function deleting() {
            let deletedobj = await Article.deleteMany({title:"Jack Baueur"});
            return deletedobj.deletedCount;
        }
    
        const numberofelementsdeleted = deleting();
        console.log(numberofelementsdeleted);
    })




//-----------------------------------------Requests targeting a specific article------------------------------------------------//
app.route("/articles/:articleTitle")
    .get(function(req, res) {
        async function getArticles(){
            let foundArticles = await Article.find({title:req.params.articleTitle});
            return foundArticles;
        };
        
        let a = getArticles();
        a.then((value)=>{
            res.send(value);
            //Since value is a list of objects
        })
        // console.log(req.params);
    })
    .patch(function(req, res) {
        async function updating() {
            let updatedArticle = await Article.updateOne(
                {title:req.params.articleTitle},
                {$set:req.body}
            );
            return updatedArticle;
        }

        let updatedArticle = updating();

        res.send(updatedArticle);
    })
    .delete(function(req, res) {
        async function deleting() {
            let deletedobj = await Article.deleteOne({title: req.params.articleTitle });
            return deletedobj.deletedCount;
        }
    
        const numberofelementsdeleted = deleting();
        if(numberofelementsdeleted>0) console.log("Successfully deleted")
    })


app.listen(3000, function(){
    console.log("Server started on port 3000");
});  
