// Imports
const express = require('express');
const bodyParser = require("body-parser");
var path = require('path');



var textMessage = "";
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//var url = "mongodb://18.118.106.197:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    //dbo.collection("works").findOne({}, function(err, result) {

    //dbo.collection("works").find({}).toArray(function(err, result) {

    dbo.collection("works").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
        
        if (err) throw err;
        //console.log(result.name);
        textMessage = result;
        console.log(result);
        db.close();
    });
});




const app = express();
const port = 3000;

var session = require('express-session');
var cookieParser = require('cookie-parser');

var i18n=require("./i18n");

const router = express.Router();
//https://www.youtube.com/watch?v=A01KtJTv1oc
// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(i18n);

app.use(cookieParser());

app.use(session({
    name: "lolo",
    secret: "i18n",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get('/lang=es', function (req, res) {
    res.cookie('i18n', 'es', {maxAge: 60000});
    res.redirect('/')
});

app.get('/lang=en', function (req, res) {
    res.cookie('i18n', 'en');
    res.redirect('/')
});





// app.get('/', function (req, res) {
//     res.setLocale(req.cookies.i18n);
//     res.render('main', {
//     i18n: res
//     })
// });

// app.get('/contact', function (req, res) {
//     res.render('contact', {
//     i18n: res
//     })
// });

app.get('', (req, res) => {
    res.cookie('i18n', res.__('COOKIE'));
    req.session.userName = "xiaoyu";
    //console.log(res.__('Hello i18n'));
    //console.log(req.cookies['i18n']);
    
    //console.log(req.session.userName);

    //req.session.destroy(); 
    //res.clearCookie("i18n cookie");

    res.setLocale(req.cookies.i18n);
    
    res.render('index', { 
        text: 'This is EJS',
        i18n: req.cookies['i18n']   //res.__('Hello i18n')
    })
})

app.get('/about', (req, res) => {
    res.render('about', { 
    text: textMessage,
    i18n: req.cookies['i18n']
    })
})

app.get('/commo', (req, res) => {   //http://localhost:3000/commo
//app.get('/commo66', (req, res) => {   //http://localhost:3000/commo66    
    res.render('commo', { text: 'commo pig'})       //commo.ejs
})

/*

router.post('/login',function(req,res){
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});

//open /views/index.html
app.get('', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

*/


//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))