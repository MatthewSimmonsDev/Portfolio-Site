const express = require('express');
const app = express();
const data = require('./data.json')

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get("/", (req, res) =>{
    res.render('index', {data});
});

app.get("/about", (req, res) =>{
    res.render('about')
});

app.get("/project/:id", (req, res) =>{
    const project = data.projects[req.params.id];
    res.render('project', {project, data})
});

//error handler 404
app.use((req, res, next) => {
    console.log("404 error handler called")
    const err = new Error();
    err.status = 404;
    res.status(err.status).send("Sorry that page doesn't exist.")
  })

//global error handler
app.use((err, req, res, next) => {
    if(err){console.log("Global error handler called", err)}
    if(err.status === 404){
        res.status(404).send(err)
    } else {
        err.message = err.message || `Oops! it looks like something went wrong.`;
        res.status(err.status || 500).send(err);
    }
});


app.listen(3000, function () {
    console.log("Server running on localhost 3000")
});