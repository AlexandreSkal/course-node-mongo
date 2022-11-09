const db = require("../models/userModel");

function getUsers(req, res, next) {
    res.json(db.findUsers())
};

function getUserById(request, response) {
    const id = request.params.id;
    response.json(db.findUser(id));
};

function postUser(request, response) {
    const user = db.insertUser(request.body);
    response.status(201).json(user)

};
function putUser(request, response) {
    const id = request.params.id;
    const user = db.updateUser(id, request.body, true);
    response.status(200).json(user);
};

function pathUser(request, response) {
    const id = request.params.id;
    const user = db.updateUser(id, request.body, false);
    response.status(200).json(user);
  }

function deleteUser(request, response) {
  const id = request.params.id;
  db.deleteUser(id);
  response.status(200).json({})
}
module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
    pathUser,
    deleteUser
}