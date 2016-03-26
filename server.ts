import express = require('express');
import GitKitClient = require('gitkitclient');
import fs = require('fs');
import http = require('http');
import cookieParser = require('cookie-parser');
import db = require('./db');

var port = 3000;
var app = express();
app.use(cookieParser());
app.use(express.static('./app'));
app.use(express.static('./node_modules'));

var gitkitConfig = JSON.parse(fs.readFileSync('./gitkit-server-config.json', 'utf-8'));
gitkitConfig.serviceAccountPrivateKey = fs.readFileSync(gitkitConfig.pemFile, 'utf-8');
var gitkitClient = new GitKitClient(gitkitConfig);

function renderStatic(resource: string, req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var html = new Buffer(fs.readFileSync(resource, 'utf-8')).toString();
  res.end(html);
}

app.get('/', function (req, res) {
  res.redirect('index.html');
});

app.get('/index.html', function(req, res) {
  renderStatic('./index.html', req, res);
});

app.get('/signin.html', function(req, res) {
  renderStatic('./signin.html', req, res);
});

app.get('/validateuser', function (req, res) {
  var gToken = req.cookies['gtoken'];
  var success = false;
  gitkitClient.verifyGitkitToken(gToken, function(err, response) {
    if(err) {
      console.log(err);
      res.send({"valid": success});
    } else {
      console.log(response);
      // need to verify that the user exists in the mongodb
      success = true;
      res.send({"valid": success});
    }
  });
  //res.header('Access-Control-Allow-Origin: http://localhost:3000');
});

app.listen(port, function () {
  console.log('Server listening on port %d in %s mode', port, app.settings.env);
});
