const express = require('express');
const router = new express.Router();
const auth = require('../models/auth');
const Patient = require("../models/users");
const options = require('../repository/repository');


    router.post('/signUpPatient', async (req, res) => {
      try {
        const user = await options.signUpPatient(req.body)
        res.status(201).send(user);
      } catch (error) {
        res.status(500).send({error: error.message});
      }
    })

    router.post('/signInPatient', async (req, res) => {
      
      try {
        const user = await options.signInPatient(req.body) 
        res.status(200).send(user);
      } catch (error) {
        res.status(404).send({error: error.message});
      }
       
    })

    router.get('/signOutPatient', auth, async (req,res) => {
      try {
        const user = await options.signOutPatient(req);
        if(user === ''){
          res.status(500).send('Something Went Wrong');
        }
        res.status(200).send(user);
      } catch (error) {
        res.status(500).send('Error: '+ error)
      }
    })

    router.get('/getPatientsList', async (req, res) => {
        try {
          const result =  await options.getPatientsList()
          res.status(200).send(result);
        } catch (error) {
          res.status(404).send({error: error.message});
        }
    })

   

  router.post('/bookAppointment', auth, async (req, res) => {
    try {
      const result = await options.bookAppointment(req.body)
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({error: error.message});
    }
    
  })

  router.post('/getPatientListBySpecialist', async (req, res) => {
    try {
      const result = await options.getPatientsListBySpecialist(req.body)
      res.status(200).send(result);  
    } catch (error) {
      res.status(404).send({error: error.message});
    }
  })
  
module.exports = router;