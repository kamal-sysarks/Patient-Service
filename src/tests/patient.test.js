const request = require('supertest');
const app = require('../server/server');

const { patientOne, setUpDB} = require('./mock_db');

beforeEach(setUpDB)

test("Should signup a new user", async () => {
    // console.log(server);
    await request(app).post('/signUpPatient').send({
        "name": "Achyut",
        "email": "achyut@g.com",
        "password": "achyut12345",
        "phone": 8989899898
    }).expect(201)
})

test("Should login a user", async () => {
    await request(app).post('/signInPatient').send({
        "email": patientOne.email,
        "password": patientOne.password
    }).expect(200)
})

test("Should not login non existing User", async () => {
    await request(app).post('/signInPatient').send({
        "email": "manohar@g.com",
        "password": "manohar12345"
    }).expect(404)
})

test("Should get Patients List", async () => {
    await request(app).get('/getPatientsList').send().expect(200)
})

test("Should logout a user", async () => {
    await request(app).get('/signOutPatient')
        .set('Authorization', `Bearer ${patientOne.tokens[0].token}`)
        .send()
        .expect(200)

})