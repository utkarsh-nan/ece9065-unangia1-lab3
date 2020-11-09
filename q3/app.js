var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var bookModel =  require('./models/data');

//connect to db
mongoose.connect('mongodb://localhost:27017/searchingg2',{useNewUrlParser:true})
.then(()=>console.log('connectd to db'))
.catch((err)=>console.log('error ',err))

//init app
var app = express();

//set view engine
app.set('view engine','ejs');

///fetch the data from request
app.use(bodyParser.urlencoded({extended:false}));

//default page load
app.get('/',(req,res)=>{
     try {
          bookModel.find((err,data)=>{
              if(err){
                  console.log(err)
              }else{
                  res.render('pages/home',{data:data});
              }
          });
     } catch (error) {
          console.log(error);
     }
});

//search
app.get('/search',(req,res)=>{
    try {
             bookModel.find({$and:[{subject:{'$regex':req.query.dsearch}},{catalog_nbr:{'$regex':req.query.dsearch1}},{Optional:{'$regex':req.query.dsearch3}}]},(err,data)=>{
                 if(err){
                     console.log(err);
                 }else{
                     res.render('pages/home',{data:data});
                 }
             })
    } catch (error) {
        console.log(error);
    }
});
app.post('/',(req,res)=>{
    try {
           var books = new bookModel({
               subject:req.body.subject,
               catalog_nbr:req.body.catalog_nbr,
               Optional:req.body.Optional,
               start_time:req.body.catalog_nbr,
               end_time:req.body.end_time,
               Days:req.body.Days,

           });
           books.save((err,data)=>{
               if(err){
                   console.log(err)
               }else{
                   res.redirect('/');
               }
           })
    } catch (error) {
        console.log(error);
    }
});

var port = process.env.PORT || 3100;
app.listen(port,()=>console.log('server run at '+port));