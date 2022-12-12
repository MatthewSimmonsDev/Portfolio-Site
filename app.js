const express = require('express');
const app = express();
const data = require('./data.json')

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get("/", (req, res) =>{
    res.render('index');
});

app.get("/about", (req, res) =>{
    res.render('about')
});

app.get("/project/:id", (req, res) =>{
    res.render('project' + req.params.id)
});

app.listen(3000, function () {
    console.log("Server running on localhost 3000")
});