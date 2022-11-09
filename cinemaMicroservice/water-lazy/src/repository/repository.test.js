const repository = require('./repository');


test('getAllPlants', async () => {
    const plants = await repository.getAllPlants();
    expect(Array.isArray(plants)).toBeTruthy();
    if (plants.length > 1)
        expect(plants.length).toBeTruthy();
})

test('addValue', async () => {
    const plantData = {
        timestamp: new Date(),
        metadata: {
            sensorId: '9999',
            type: 'humidity',
            location: 'yard',
        },
        humidity: 78
    };
    let result;

    try {
        result = await repository.addValue(plantData);
        expect(result).toBeTruthy();
    }
    finally {
        if (plantData)
            await repository.deleteSensorById(plantData.metadata.sensorId)
    }
})

test('deleteSensorById', async () => {
    const plantData = {
        timestamp: new Date(),
        metadata: {
            sensorId: '9999',
            type: 'humidity',
            location: 'yard',
        },
        humidity: 78
    };

    const insert = await repository.addValue(plantData);
    const deleteInserted = await repository.deleteSensorById(insert.metadata.sensorId);
    expect(deleteInserted).toBeTruthy();

})