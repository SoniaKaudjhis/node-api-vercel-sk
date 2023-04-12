// index.js
'use strict';

var fs = require('fs');
const express = require('express')
const app = express()

const PORT = 4000


// app.use('/public', express.static(process.cwd() + '/public'));
app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

//Listen on port set in environment variable or default to 3000
const listener = app.listen(PORT || 3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});

// Export the Express API
module.exports = app