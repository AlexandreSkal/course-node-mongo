var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!global.carros) global.carros = [];
  res.render('carros', { title: 'Lista e Cadastros de Carros' , carros: global.carros});
});

module.exports = router;
