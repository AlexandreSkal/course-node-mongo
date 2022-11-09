var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('livros', { title: 'Lista e Cadastros de livros' });
});

module.exports = router;
