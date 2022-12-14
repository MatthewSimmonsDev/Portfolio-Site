const express = require('express');
const { render } = require('pug');
const app = express();
const data = require('./data.json').projects

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
    const projectId = req.params.id;
    const project = data.find(({ id }) => id === +projectId);
    res.render('project', {project})
});

// 404 Error Handler
app.use(function(req, res, next){
    const err = new Error('Page Does Not Exist');
    err.status = 404;
    next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    if(err.status === 404) {
        res.render('page-not-found', {err});
    } else {
        res.render('error', {err});
    }
  });


app.listen(3000, function () {
    console.log("Server running on localhost 3000")
});