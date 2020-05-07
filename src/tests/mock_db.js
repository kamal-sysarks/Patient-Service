// Some mock Data to execute test suits.

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Patient = require('../models/users');

const patientOneId = new mongoose.Types.ObjectId();
const patientOne = {
    _id: patientOneId,
    "name": "Aatresh",
    "email": "aatresh@g.com",
    "password": "aatresh12345",
    "phone": 8989899898,
    tokens: [{
        token: jwt.sign({_id: patientOneId}, process.env.JWT_SECRET)
    }]        
}

const patientTwoId = new mongoose.Types.ObjectId();
const patientTwo = {
    _id: patientTwoId,
    "name": "Hemanth",
    "email": "hemanth@g.com",
    "password": "hemanth12345",
    "phone": 8989899898,
    tokens: [{
        token: jwt.sign({_id: patientTwoId}, process.env.JWT_SECRET)
    }]        
}

const patientThreeId = new mongoose.Types.ObjectId();
const patientThree = {
    _id: patientThreeId,
    "name": "Guru",
    "email": "guru@g.com",
    "password": "guru12345",
    "phone": 8989899898,
    tokens: [{
        token: jwt.sign({_id: patientThreeId}, process.env.JWT_SECRET)
    }]        
}

const setUpDB = async () => {
    await Patient.deleteMany();
    await new Patient(patientOne).save();
    await new Patient(patientTwo).save();
    await new Patient(patientThree).save();
}

module.exports = {
    patientOne,
    setUpDB
}