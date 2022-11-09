const updateSensor = require('./update-sensor');
const request = require('supertest');

let server = null;
beforeAll(async () => {
    server = require('../app');
})

test('GET /update-sernsor', async () => {
    const response = await request(server).get('/update-sensor');
    expect(response.status).toEqual(200);
})

test('POST /update-sensor 201 OK', async () => {
    const plantData = {
        timestamp: new Date(),
        metadata: {
            sensorId: 9999,
            type: "humidity",
            location: "yard",
        },
        humidity: 78
    };

    const response = await request(server)
        .post('/update-sensor')
        .set('Content-Type', 'application/json')
        .send(plantData)

    expect(response.status).toEqual(201);
    expect(response.body).toBeTruthy();
})

test('GET /sensorId/:id 200 OK', async () => {
    const responseGet = await request(server).get('/update-sensor/sensorId/9999')
    console.log(responseGet.body)
    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toBeTruthy();
})

test('DELETE /update-sensor/:id', async () => {
    const response = await request(server).delete('/update-sensor/9999');
    expect((response).status).toEqual(204);
})