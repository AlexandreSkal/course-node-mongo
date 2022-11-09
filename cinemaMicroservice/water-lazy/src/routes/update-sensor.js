var express = require('express');
var router = express.Router();

const repository = require('../repository/repository');
const timestamp = new Date();

router.post('/', async function(req, res, next) {
  let metadata = {}
  humidity = req.body.humidity;
  sensorId = parseInt(req.body.metadata.sensorId);
  type = req.body.metadata.type;
  location = req.body.metadata.location;
  metadata = {sensorId, type, location} 
  const result = await repository.addValue({timestamp, metadata, humidity})
  res.status(201).json(result)
});

router.get('/', async function(req, res, next) {
  const plants = await repository.getAllPlants();
  res.json(plants);
})

router.get('/sensorId/:id', async function(req, res, next) {
  sensorId = parseInt(req.params.id);
  const values = await repository.getValuesById(sensorId);
  let humidity = values.map(i => i.humidity)
  res.json(humidity)
})

router.delete('/:id', async function (req, res, next) {
  const id = parseInt(req.params.id);
  const result = await repository.deleteSensorById(id);
  res.sendStatus(204);
})

module.exports = router;
