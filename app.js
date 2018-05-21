//calls web server
var express = require('express');
//initiates the body parser
var bodyParser = require('body-parser');
//initilizes the mongodb
var mongoose = require('mongodb').MongoClient,
  test = require('assert');
MongoClient.connect('mongodb://admin:B29R233@cluster0-shard-00-00-4mutn.mongodb.net:27017,cluster0-shard-00-01-4mutn.mongodb.net:27017,cluster0-shard-00-02-4mutn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', function(err, db) {
  test.equal(null, err);


//var mongoose = require('mongoose');
//Database connector
//mongoose.connect("mongodb://admin:B29R233@cluster0-shard-00-00-4mutn.mongodb.net:27017,cluster0-shard-00-01-4mutn.mongodb.net:27017,cluster0-shard-00-02-4mutn.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true");
//mongoose.connect('mongodb://localhost/spacesuit');


var app = express();

//Import files for use in the project
Simulation = require('./models/simulate');
SuitSwitch = require('./models/suitswitch');

//Returns all simulated data from the database !
app.get('/api/suit', function(req, res){      
        Simulation.getSuitTelemetry(function (err, data) {
            if (err) {
                throw err;
                console.log(err);
            }
            res.json(data);
        });
});

//This is a comment
app.get('/api/suit/recent', function(req, res){      
    Simulation.getSuitTelemetryByDate(function (err, data) {
        if (err) {
            throw err;
            console.log(err);
        }
        x = Date.now().toString; 
        console.log('Suit data accessed at!');
        res.json(data);
    });
});

app.get('/api/suitswitch', function(req, res){      
    SuitSwitch.getSuitSwitch(function (err, data) {
        if (err) {
            throw err;
            console.log(err);
        }
        res.json(data);
    });
});

app.get('/api/suitswitch/recent', function(req, res){      
    SuitSwitch.getSuitSwitchByDate(function (err, data) {
        if (err) {
            throw err;
            console.log(err);
        }
        console.log('Switch data accessed');
        res.json(data);
    });
});


app.listen(3000);
console.log('Server is running on port 3000...');

//Start simulation with time value
var time = Date.now(); 
var interval = setInterval(Simulation.suitTelemetry.bind(null, time),1000);
var interval_switch = setInterval(SuitSwitch.SuitSwitch,1000);
console.log("--------------Simulation started--------------")

