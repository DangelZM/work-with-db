var express = require('express');
var router = express.Router();

const Project = require('../../models/Project');

/* GET home page. */
router.get('/', function(req, res, next) {
  Project.find({}).then((projects) => {
    return res.render('index', { title: 'Projects', projects: projects });
  }).catch((err) => {
    return next(err);
  })
});

module.exports = router;
