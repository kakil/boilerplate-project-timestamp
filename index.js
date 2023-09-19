// index.js
// where your node app starts

// This is the example Timestamp Microservice that we are duplicating
// https://timestamp-microservice.freecodecamp.rocks/api/
// Below is my implementation of the example 

// init project
var express = require('express');
var app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});


const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');
const { time } = require('console');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});



app.get('/api/:param', (req, res) => {
  const { param } = req.params;
  let unixTimestamp, utcFormattedDate;

  if (!param) {
    // If param is empty, use current date and time
    unixTimestamp = Date.now();
    utcFormattedDate = new Date().toUTCString();
  } else {
    // Check if the parameter is a valid date
    const date = new Date(param);
    if (!isNaN(date)) {
      unixTimestamp = date.getTime();
      utcFormattedDate = date.toUTCString();
    } else if (!isNaN(param)) {
      // Check if the parameter is a valid timestamp
      unixTimestamp = parseInt(param, 10);
      utcFormattedDate = new Date(unixTimestamp).toUTCString();
    } else {
      return res.status(400).json({ error: 'Invalid Date' });
    }
  }

  res.json({ unix: unixTimestamp, utc: utcFormattedDate });
});

app.get('/api/', (req, res) => {
  let unixTimestamp, utcFormattedDate;
  // If param is empty, use current date and time
  unixTimestamp = Date.now();
  utcFormattedDate = new Date().toUTCString();

  res.json({ unix: unixTimestamp, utc: utcFormattedDate });
});



function formatDateToUTC(date) {
  const option = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC'

  };

  const formattedUTCDate = new Date(date).toLocaleString('en-US', option);
  return formattedUTCDate;
}

const inputDate = '2023-09-18';
const utcFormattedDate = formatDateToUTC(inputDate);

const jsonObject = {
  utc: utcFormattedDate,
};

console.log(jsonObject);



