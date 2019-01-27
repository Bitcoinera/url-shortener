'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const schemas = require(__dirname + '/schemas.js');
const checkUrl = require(__dirname + '/check-url.js');

const port = process.env.PORT || 3000;

const Url = schemas.Url;

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', function(req, res){
  
  //let randomNumber = Math.floor(Math.random() * 100) + 1;
  Url.count({}, function(err, count){
    let index = count;

    let url = new Url({
      original_url: req.body.url,
      short_url: index.toString()
    });
    
    if (checkUrl(url.original_url)){
      url.save();
  
      res.json({original_url: url.original_url, short_url: url.short_url});
    } else {
      res.json({error: 'Invalid url'});
    }
  })
})

app.get("/:shortUrl", function(req, res){
  let shortUrl = req.params.shortUrl;

  Url.findOne({short_url: shortUrl}, function(err, url){
    if (!err) {
      res.redirect(url.original_url);
    }
  })
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});