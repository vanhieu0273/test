var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  console.log('req', req.query.id);
  console.log('title', req.query.title);
  
  res.send('respond with a resource');
});

module.exports = router;
