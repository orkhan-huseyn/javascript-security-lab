const express = require('express');
const cookieParser = require('cookie-parser');

const { USERS, BALANCES } = require('./database');
const COOKIE_SECRET = 'SUPER SECRET KEY';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

app.get('/', function (req, res) {
  const username = req.signedCookies.username;
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
    res.cookie('username', username, { signed: true });
    res.redirect('/');
  } else {
    res.send('Username or password is wrong!');
  }
});

app.post('/transfer', function (req, res) {
  const username = req.signedCookies.username;
  const { to, amount } = req.body;

  BALANCES[username] -= Number(amount);
  BALANCES[to] += Number(amount);

  res.redirect('/');
});

app.listen(8080, function () {
  console.log('Express server is running on port 8080');
});
