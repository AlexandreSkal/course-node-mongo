const database = require('./database');
test('Connection database', async () => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
})

test('Disconnection database 2x', async () => {
    await database.disconnect();
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})

test('Disconnection database', async () => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})

