const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
  res.locals._apiEnpoint = true;
  next();
});

router.use('/projects', require('./controllers/projects'));
router.use('/tasks', require('./controllers/task'));

module.exports = router;
