require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

app.set('package', require('./package.json'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

require('./config/db');
require('./app/middlewares')(app);
require('./app/routes')(app);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  if(res.locals._apiEnpoint) {
    res.send(err);
  } else {
    res.render('error');
  }
});

module.exports = app;