const fs = require('fs')
const express = require('express')
const app = express()

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

app.listen(3030)
