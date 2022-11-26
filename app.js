const express=require("express")
const path=require("path")
const fs=require("fs");
const app=express();
var mongoose=require('mongoose')
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/ContactDance',{useNewUrlParser:true})
const port=80
//defining schemaw
var contactSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    adress:String,
    age:String
})
var Contact=mongoose.model('Contact', contactSchema)

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
})

app.get('/About',(req,res)=>{
    const params={}
    res.status(200).render('About.pug',params)
})

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var mydata= new Contact(req.body)
    mydata.save().then(()=>{
        res.send("this item is saved to database")
    }).catch(()=>{
        res.status(404).send("item not saved")
    })
    // res.status(200).render('contact.pug')
})

app.listen(port,()=>{
    console.log(`port started sucessfully on ${port}`)
})