const fs = require('fs')
const express = require('express')
const app = express()
var EndPoint = require('./models/endpoint')
const mongoose = require('mongoose')

var connection = mongoose.connect('mongodb://localhost/karan-blog');
function insertEndPoint(newEndpoint) {

  EndPoint.find({endpoint:newEndpoint}, function(err,endpoint) {

    if(err) {
      return {'error':err}
    }

    if(endpoint.length == 0) {
      let endpoint = new EndPoint({ endpoint: newEndpoint });

      endpoint.save(function(err,endpoint) {
        return {'error':err,'endpoint':endpoint}
      })
    }

    return {'error':'Already entered endpoint'}


  })


}


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.get('/posts/:post', (req, res) => {
  res.send({ data: fs.readFileSync(__dirname + '/posts/' + req.params.post + '.md').toString().replace(/\r\n|\r/g, '\n') })
})

app.get('/media/:file', (req, res) => {
  res.sendFile(__dirname + '/media/' + req.params.file)
})
app.get('/sw.js',(req,res) => {
  res.sendFile(__dirname + 'public/sw/sw.js');
})

app.post('/endpoint',(req,res) => {
  let newEndpoint = req.body.endpoint

  EndPoint.find({endpoint:newEndpoint}, function(err,endpoint) {

    if(err) {
      res.send({'error':err});

    }

    if(endpoint.length == 0) {
      let endpoint = new EndPoint({ endpoint: newEndpoint });

      endpoint.save(function(err,endpoint) {
        res.send({'error':err,'endpoint':endpoint})
      })
    } else {
      res.send({'error':'Already entered endpoint'})
    }


  })
})

app.listen(3030)
