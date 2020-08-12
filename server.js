const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);
app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);
// Get One with Id or all without
app.get('/api/members/:id?', (req, res) => {
  const idToGet = req.params.id !== undefined ? `/${req.params.id}` : '';
  request(`http://localhost:3000/members${idToGet}`, (err, response, body) => {
    if(response.statusCode <= 500) {
      res.send(body);
    }
  });
});
let validate = function(member) {
  return typeof member.firstName === 'string' && member.firstName.length > 0 &&
    typeof member.lastName === 'string' && member.lastName.length > 0 &&
    typeof member.jobTitle === 'string' && member.jobTitle.length > 0 &&
    // There is an issue in the data model where team is not referenced to the team table but this should be pulling the
    // team values and verifying the value here is in that list
    typeof member.team === 'string' && member.team.length > 0 &&
    (member.status === 'Active' || member.status === 'Inactive');
};
// Update
app.put('/api/members/:id', (req, res) => {
  if(validate(req.body)) {
    axios.put(
      `http://localhost:3000/members/${req.params.id}`,
      req.body
    ).then(response => {
      res.send(response.data);
    }).catch(error => {
      console.error(error);
      res.send(error);
    });
  } else {
    res.send('Data not valid');
  }
});
// Create
app.post('/api/members', (req, res) => {
  if(validate(req.body)) {
    axios.post(
      `http://localhost:3000/members`,
      req.body
    ).then(response => {
      res.send(response.data);
    }).catch(error => {
      console.error(error);
      res.send(error);
    });
  } else {
    res.send('Data not valid');
  }
});
// Get all teams
app.get('/api/teams', (req, res) => {
  request(`http://localhost:3000/teams`, (err, response, body) => {
    if(response.statusCode <= 500) {
      res.send(body);
    }
  });
});
// Handel the html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});
app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
