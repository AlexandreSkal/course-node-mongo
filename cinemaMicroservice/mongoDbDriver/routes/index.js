const { response, request } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', function (req, res, next) {
  db.findCustomers()
    .then(customers => {
      //console.log(customers);
      res.render('index', { title: 'Express', customers });
    })
    .catch(error => {
      console.log(error);
      res.render("error", { message: 'Não foi possível listar os clientes' , error});
    })

});

router.get('/new', (req, res) => {
  res.render('customer', { title: 'Client Registration', customer: {} });
})

router.get('/edit/:customerId', (request, response) => {
  const id = request.params.customerId;
  db.findCustomer(id)
    .then(customer => response.render("customer", { title: 'Edição de cadastro', customer }))
    .catch(error => {
      console.log(error);
      response.render("error", { message: 'Não foi possível editar o cliente', error });
    })
})

router.get('/delete/:customerId', (request, response) => {
  const id = request.params.customerId;
  db.deleteCustomer(id)
    .then(response.redirect("/"))
    .catch(error => {
      console.log(error);
      response.render("error", { message: 'Não foi possível deletar o cliente', error });
    })
})

router.post('/new', (request, response) => {
  if (!request.body.name)
    return response.redirect("/new?error=O campo nome é obrigatório!");

  if (request.body.age && !/[0-9]+/.test(request.body.age))
    return response.redirect("/new?error=O campo idade é numérico!");

  const id = request.body.id;
  const name = request.body.name;
  const age = parseInt(request.body.age);
  const city = request.body.city;
  const uf = request.body.uf.length > 2 ? '' : request.body.uf;

  const customer = { name: name, age: age, city: city, uf };
  console.log(typeof (id))
  console.log(customer)
  const promise = id ? db.updateCustomer(id, customer)
    : db.insertCustomer(customer);

  promise
    .then(result => {
      response.redirect("/");
    })
    .catch(error => {
      console.log(error);
      res.render("error", { message: "Não foi possível salvar o cliente", error })
    });
})

module.exports = router;
