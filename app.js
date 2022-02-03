const express= require("express");
const fs= require("fs");
const path= require("path");
const app= express();
const port =8000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { send } = require("process");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactCustomer');
}

// define mongoose schemasss
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    // required: true
  });

// const contactSchema = new Schema();
// contactSchema.add(contactSchema).add({required: true });

//   models definessss

const Contact = mongoose.model('Contact', contactSchema);


// app.use(express.static('/static',options) );
//express specific stuff
app.use('/static',express.static('static'))//for serving static file
app.use(express.urlencoded());


//pug specific stuff

app.set('view engine', 'pug')//set template engine as pug
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS
app.get('/', (req, res)=>{

    const params = {}
    res.status(200).render('home.pug', params);
})


app.get('/contact', (req, res)=>{

    const params = {}
    res.status(200).render('contact.pug', params);
})

// app.get('/submit', (req, res)=>{

//     const params = {}
//     res.status(200).render('submit.pug', params);
// })

app.post('/contact', (req, res)=>{
    var mydata= new Contact(req.body);
    mydata.save().then(()=>{
        res.render('submit.pug');
    }).catch(()=>{
        res.status(400).send("item was not saved")
    });
    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

