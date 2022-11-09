const { request } = require('express');
var express = require('express');
const { valid } = require('joi');
var router = express.Router();
const userController = require("../controllers/userController");
const validaionMiddleware = require("../middlewares/validationMiddleware");

/* GET users listing. */
router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.post("/", validaionMiddleware, userController.postUser)

router.put("/:id", validaionMiddleware, userController.putUser)

router.patch("/:id",validaionMiddleware, userController.pathUser)

router.delete("/:id", userController.deleteUser)

module.exports = router;
