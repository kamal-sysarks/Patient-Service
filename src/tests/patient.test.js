const request = require('supertest');
const app = require('../server/server');
const User = require('../models/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    "name": "Aatresh",
    "email": "aatresh@g.com",
    "password": "aatresh12345",
    "phone": 8989899898,
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]        
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

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
        "email": userOne.email,
        "password": userOne.password
    }).expect(200)
})

test("Should not login non existing User", async () => {
    await request(app).post('/signInPatient').send({
        "email": "manohar@g.com",
        "password": "manohar12345"
    }).expect(404)
})

test("Should logout a user", async () => {
    await request(app).get('/signOutPatient')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

})