const fs = require('fs')
const express = require('express')
const app = express()
var EndPoint = require('./models/endpoint')
const mongoose = require('mongoose')
var atob = require('atob')
var connection = mongoose.connect('mongodb://localhost/karan-blog');

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


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


var gcm = require('node-gcm');

// Create a message
// ... with default values
var message = new gcm.Message();

// ... or some given values

var message = new gcm.Message({
    data: { key1: 'msg1' },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed ASAP."
    }
});

// Set up the sender with you API key
var sender = new gcm.Sender('AAAAzriVFW0:APA91bE2RU0mFhiVnods85R9H6Z-5yL8BG4lJz1O2OqVoyYbUKD9M0PtOndd2gr6dbSyfGSBENYHgtkAq93w2JN3qmJGuIPzRtYZ1a1jqG_r6YL25krunsI1mh4URby_UkBRApQCQUKYM52xDyEeIuSsgio2VMdzVw');

// Add the registration tokens of the devices you want to send to
var registrationTokens = [];
registrationTokens.push('e9TIo-bGqz8:APA91bEVD70O4R0fWEji2FOUuliBxJFCOg88u2R4bBalUKWeX_2HOdDGsi7ikwh8g0dT8N5Wg_W2ledG9YvA_JPJYjLzmlpQEhRfKta3qyST91c-pmReDMdhCkJEwlJLdQd5aJlhxdSu')

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


app.get('/endpoint',(req,res) => {
  EndPoint.find(function(err,endpoints) {
    if(err) {
      res.send({'error':err});
    }

    // Send the message
    // ... trying only once
    sender.sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
      if(err) console.error(err);
      else    console.log(response);
    });

    res.send({'endpoints':endpoints})
  })
})


app.listen(3030)
