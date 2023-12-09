const express = require("express");
// const fs = require("fs");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8000;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('contact', contactSchema);


app.use(`/static`, express.static(`static`)); //for serving static file
app.use(express.urlencoded());

//Pug specific stuff
app.set('view engine', 'pug') //set the templete engine
app.set(`views`, path.join(__dirname, `views`)); //set the views directory

//End points
app.get(`/`,(req, res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
})

app.get(`/contact`,(req, res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
})



app.post(`/contact`,(req, res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.send("This items has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item not saved to the database")
    });

    // res.status(200).render('contact.pug', params);
})



//Start the server
app.listen(port, ()=>{
    console.log(`This application running succesfully on ${port}`);
});

