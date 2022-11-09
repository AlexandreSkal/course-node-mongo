const database = require("../config/database");
const { ObjectId } = require('mongodb');

async function getAllPlants() {
    const db = await database.connect();
    const result = await db.collection('sensors').find().toArray();
    return result;
}

async function getValuesById(sensorId){
    const db = await database.connect();
    const result = await db.collection('sensors').find({'metadata.sensorId': sensorId}).toArray();
    return result;
}

async function addValue(dataSensor) {
    const db = await database.connect();
    const result = await db.collection('sensors').insertOne(dataSensor);
    dataSensor._id = result.insertedId;
    return dataSensor;
}

async function deleteSensorById(sensorId) {
    const db = await database.connect();
    return await db.collection('sensors').deleteMany({"metadata.sensorId": sensorId })
}
module.exports = {
    addValue,
    getAllPlants,
    deleteSensorById,
    getValuesById
};