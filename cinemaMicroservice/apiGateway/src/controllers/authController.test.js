const app = require('../server/index');
const request = require('supertest');
const repository = require('../repository/repository');
const {ObjectId} = require('mongodb');


const loginOk = {
    email: "Alexandre.admin.cel@gmail.com",
    password: "123456",
};

const loginNok = {
    email: 'Alexandre.admin.cel@gmail.com',
    password: '12345',
};

let token = '';
const tokenBlacklist = new ObjectId().toHexString()

beforeAll(async () => {
    process.env.PORT = 4001

    const response = await request(app)
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send(loginOk);
    token = response.body.token;

    console.log(token);

    await repository.blacklistToken(tokenBlacklist);
})

afterAll(async () => {
    app.close();
})


test('POST /login/ 200 OK', async () => {
    const response = await request(app)
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send(loginOk);

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
})

test('POST /Login 422 UNPROCESSABLE ENTITY', async () => {
    loginOk.data = new Date();

    const response = await request(app)
        .post('/login/')
        .set('Content-Type', 'application/json')
        .send(loginOk)

    expect(response.status).toEqual(422);
})

test('POST /Login 401 UNAUTHORIZED', async () => {
    const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(loginNok)

    expect(response.status).toEqual(401);
})

test('POST /Logout 200 OK', async () => {
    const response = await request(app)
        .post('/logout')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200);
})

test('POST /Logout 401 UNAUTHORIZED', async () => {
    const response = await request(app)
        .post('/logout')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${token}1`)

    expect(response.status).toEqual(401);
})

test('POST /Logout 401 UNAUTHORIZED(BlackList)', async () => {
    const response = await request(app)
        .post('/logout')
        .set('Content-Type', 'application/json')
        .set('authorization', `Bearer ${tokenBlacklist}`)

    expect(response.status).toEqual(401);
})

