const multer = require('multer');
const auth = require('../models/auth');
const sharp = require('sharp');
const Patient = require("../models/users");

module.exports = (app, options) => {
    app.post('/registerPatient', async (req, res, next) => {
        await options.patientRegister(req.body)
        .then(result => {
          console.log("Inside patient:" + result);
          res.status(200).send(result);
        }).catch(err => {
          res.send(err);
        }).catch(next);
    })

    app.post('/loginPatient', async (req, res, next) => {
        await options.patientLogin(req.body)
        .then(result => {
          if(!result){
            return res.status(404).send("User doesn't exists");
          }
          res.status(200).send(result);
        }).catch(err => {
          res.status(500).send(err);
        }).catch(next);
    })

    app.post('/logoutPatient', auth, async (req,res) => {
      try { 
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send('User logged out');
      } catch (error) {
        res.status(500).send('Something Went Wrong'+ error)
      }
    })

    app.post('/logoutPatientAll', auth, async (req, res) => {
      try { 
        req.user.tokens = [];
        await req.user.save();
        res.send('User logged out from All Devices.');
      } catch (error) {
        res.status(500).send('Something Went Wrong'+ error)
      }
    })
  
    app.get('/getAllPatient', auth, async (req, res, next) => {
     await options.allPatient()
        .then(result => {
          res.status(200).send(result);
        }).catch(err => {
          res.send(err);
        }).catch(next)
    })

    const upload = multer({
      limits: {
        fileSize: 1000000
      },
      fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
          return cb(new Error("Please upload an image"));
        }
        cb(undefined, true);
      }      
    })

    app.post('/patient/profile', upload.single('avatar'), async (req, res) => {
      const buffer = await sharp(req.file.buffer).resize({width: 320, height:320}).png().toBuffer();   
      
      req.user.avatar = buffer;
        await req.user.save();
        res.send();
     },(error, req, res, next) =>{
        res.status(400).send({error: error.message});
     })

     app.get('/patient/:id/avatar', async (req, res) => {
      try{
        const user = await Patient.findById(req.params.id);

        if(!user || !user.avatar){
          throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

      }catch(error){
        console.log(error);
        res.status(404).send();
      }
    });

    app.post('/bookAppointment', auth, async (req, res) => {
      await options.bookAppointment(req.body)
        .then(result => {
          // console.log("Inside patient" + result);
          res.status(200).send(result);
        }).catch(err => {
          res.send(err);
        })
    })

    app.post('/getAllPatientByDoctorID', async (req, res) => {
      await options.getAllPatientByDoctorID(req.body)
        .then(result => {
          // console.log("Inside patient" + result);
          res.status(200).send(result);
        }).catch(err => {
          res.send(err);
        })
    })
  }