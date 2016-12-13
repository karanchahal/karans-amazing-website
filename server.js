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



var gcm = require('node-gcm');

// ... or some given values
var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    restrictedPackageName: "somePackageName",
    dryRun: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed ASAP."
    }
});


// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyB3GSz19aA9cNGZ6B5GStIjr2OquY6-uO0')
// Send the message
// ... trying only once



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
    let registrationTokens = ['https://android.googleapis.com/gcm/send/eq3bUwB-6S8:APA91bHcYg7C0k1pkF-LRCRFsCEUKVA0y0GX_K-gDU4bIfGscH1mP7SsDnFMyHUizWML1pChDq3Mlf8YQLLsCPTRGH6woYd-TAS2BuAHjVIwYr2pLFzuLD_LCStdaLugGp7bojMxO5Q6'];
    /*endpoints.map((record, index) => {
      console.log(record.endpoint)
      registrationTokens.push(record.endpoint)
    });*/

    sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
      if(err) console.error(err);
      else    console.log(response);
    });


    res.send({'endpoints':endpoints})
  })
})


app.listen(3030)
