const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000


// ----------------------------------------------------------------------------------------------

// Middleware
app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ----------------------------------------------------------------------------------------------

//Imports
require('./routes')(app);



























// For parsing the body of post request



// ----------------------------------------------------------------------------------------------



// listening the requests at some port
app.listen(port, (req,res)=>
{
    console.log("Server Running on port " + port);
});

// ----------------------------------------------------------------------------------------------