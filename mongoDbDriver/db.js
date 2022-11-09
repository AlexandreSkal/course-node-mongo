const { ObjectId } = require('mongodb');

const objectId = require('mongodb').ObjectId
const mongoClient = require('mongodb').MongoClient;

function connectDatabase() {
    console.log(global.connection);
    if(!global.connection)
        mongoClient.connect(process.env.MONGODB_CONNECTION)
            .then(connection => {
                global.connection = connection.db('dbDriver');
                console.log('Connected to Mongo!');
            })
            .catch(error => {
                console.log(error);
                global.connection = {};
                console.log(global.connection);
            });
    }
    connectDatabase();
function findCustomers() {
    connectDatabase();
    return global.connection
        .collection('customers')
        .find({})
        .toArray();
}

function findCustomer(id) {
    connectDatabase();
    const objectId = new ObjectId(id);
    return global.connection
        .collection('customers')
        .findOne({ _id: objectId })
}

function insertCustomer(customer) {
    connectDatabase();
    return global.connection
        .collection('customers')
        .insertOne(customer);
}
function updateCustomer(id, customer) {
    connectDatabase();
    const objectId = new ObjectId(id);
    return global.connection
        .collection("customers")
        .updateOne({ _id: objectId }, { $set: customer });
}

function deleteCustomer(id) {
    connectDatabase();
    const objectId = new ObjectId(id);
    return global.connection
        .collection('customers')
        .deleteOne({ _id: objectId });
}

module.exports = { findCustomers, insertCustomer, updateCustomer, deleteCustomer, findCustomer }