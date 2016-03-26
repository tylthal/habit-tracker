import express = require('express');
import GitKitClient = require('gitkitclient');
import fs = require('fs');
import http = require('http');
import cookieParser = require('cookie-parser');
import db = require('./db');

var port = 3000;
var app = express();
app.use(cookieParser());

var gitkitConfig = JSON.parse(fs.readFileSync('./gitkit-server-config.json', 'utf-8'));
gitkitConfig.serviceAccountPrivateKey = fs.readFileSync(gitkitConfig.pemFile, 'utf-8');
var gitkitClient = new GitKitClient(gitkitConfig);

// this is just a test to verify that Google Identity APIs are working
var getAccountInfo = function() {
  gitkitClient.downloadAccount(1, function(err, accounts) {
    if (err) {
      console.log(err);
    } else if (accounts != null) {
      for(var i = 0; i < accounts.length; i++) {
        console.log(accounts[i]);
      }
    } else {
      console.log("finished.");
    }
  });
};
//getAccountInfo();

app.get('/', function (req, res) {
  var gToken = req.cookies['gtoken'];
  //console.log("gtoken: ", gToken);
  res.send('habit-server responding.');
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
