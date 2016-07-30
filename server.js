var express = require('express'); //awesome framework that makes life easier
var bodyParser = require('body-parser'); //it parses the body of the requests into something we can use
var cors = require('cors'); //let's us do cross-site HTTP requests
var Firebase = require("firebase");
var hackathonDriver = Firebase.initializeApp({
  apiKey: "apiKey",
  authDomain: "hackathon-facebook-30-07.firebaseapp.com",
  databaseURL: "https://hackathon-facebook-30-07.firebaseio.com/",
  storageBucket: "bucket.appspot.com",
});

var app = express();

var portNum = 3000;
app.listen(portNum, function () {
	console.log('Taking a shower in port:', portNum);
}) // gets my server going when running: node server.js on the terminal

app.use(bodyParser()); //let's use the body parser!
app.use(cors()); // let's use cors!

app.use(express.static(__dirname + '/')); // serve up my index.html found in the same directory | not essential for tutorial

app.get('/api/get', function (req, res) {
  var usersRef = hackathonDriver.database().ref("test");
  usersRef.set({
    alanisawesome: {
      date_of_birth: "June 23, 1912",
      full_name: "Alan Turing"
    },
    gracehop: {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
  });

	res.send('save data success');
})
