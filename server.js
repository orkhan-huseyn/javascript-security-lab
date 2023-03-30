const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');

const { USERS, BALANCES, SESSIONS } = require('./database');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', function (req, res) {
  const sessionId = req.cookies.SID;
  const username = SESSIONS[sessionId];
  if (!username) {
    res.redirect('/login');
  } else {
    res.render('index', {
      name: username,
      balance: BALANCES[username],
    });
  }
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/logout', function (req, res) {
  res.clearCookie('username');
  res.redirect('/login');
});

app.post('/login', function (req, res) {
  const { username, password } = req.body;
  if (USERS[username] == password) {
    const sessionId = crypto.randomBytes(32).toString('base64url');
    SESSIONS[sessionId] = username;
    res.cookie('SID', sessionId);
    res.redirect('/');
  } else {
    res.send('Username or password is wrong!');
  }
});

app.post('/transfer', function (req, res) {
  const sessionId = req.cookies.SID;
  const username = SESSIONS[sessionId];
  const { to, amount } = req.body;

  BALANCES[username] -= Number(amount);
  BALANCES[to] += Number(amount);

  res.redirect('/');
});

app.listen(8080, function () {
  console.log('Express server is running on port 8080');
});
