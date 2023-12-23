const express = require('express');
const path = require('path');
const { log } = require('console');
const app = express();
const mongoose = require('mongoose')
// const bodyparser = require('body-parser')// we didn't use bodyparser in this code so u can write code without it
mongoose.connect('mongodb://localhost/contactDance');
const port = 8000;


// Define mongoose Schema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

// Model of contactSchema 

var Contact = mongoose.model('Contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('./static', express.static('static')); //FOR SERVING STATIC FILES
app.use(express.urlencoded());

// PUG SPECIFIC STUF
app.set('view engine','pug') //set the templete engine as a pug
app.set('views',path.join(__dirname, 'views')); // set the views folder directory

// ENDPOINTS
app.get('/',(req, res) =>{
    const con = "This is the best content ont he internet so far so use it wisely"
    const params = { };
    res.status(200).render('home.pug',params)
});
app.get('/contact',(req, res) =>{
    const params = { };
    res.status(200).render('contact.pug',params)
});

// Contact post request to save the data in database
app.post('/contact',(req, res) =>{
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been saved to the database")
    }).catch(()=> {
        res.status(400).send("Iten was not send to the database")
    });
    // res.status(200).render('contact.pug')
});

//START THE SERVER
app.listen(port, () =>{
    console.log(`The application started successfully on port ${port}`);
});