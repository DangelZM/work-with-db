module.exports = (app) => {

  app.use('/', require('./front'));
  app.use('/api', require('./api'));

};