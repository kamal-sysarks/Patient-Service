'use strict'
const Patient = require("../models/users");
const CombineCollection = require("../models/patientdoctor");

const repository = (db) => {
  
  const patientRegister = async (patient) => {
    try {
      const user = new Patient(patient);
      const savedUser =  await user.save();
      const token = await user.generateAuthToken();
      return {savedUser, token};
    } catch (error) {
      console.log(error);
      return error;
    }
      
  }

  const patientLogin = async (patient) => {
    
      try{
        const user = await Patient.findByCredentials(patient.email, patient.password);
      const token = await user.generateAuthToken();
      return {user, token};
      }catch(e){
        console.log(e);
        return e;
      }


  }

  const allPatient = async () => {
    
    try {
      const patients = await Patient.find({});
      return patients;  
    } catch (error) {
      console.log("error:" + error);
      return error;
    }
    
  }

  const bookAppointment = async (val) => {
    
    try {
      const patient = await Patient.findById(val.patient_id);
      console.log(patient);
      const value = await new CombineCollection({...val, patient_name: patient.name});
      const savedUser =  await value.save();
      console.log(savedUser);
      // const user = new CombineCollection(patient);
      // const savedUser =  await user.save();
       return savedUser; 
    } catch (error) {
      console.log("error:" + error);
      return error;
    }
    
  }

  const getAllPatientByDoctorID = async (id) => {
    
    try {
      // const user = new CombineCollection(patient);
      // const savedUser =  await user.save();
      // return savedUser; 
      const val = await CombineCollection.findPatientsByID(id);
      return val;
    } catch (error) {
      console.log("error:" + error);
      return error;
    }
    
  }

  const disconnect = () => {
    db.close()
  }

  const obj = Object.create({
    patientRegister,
    patientLogin,
    allPatient,
    bookAppointment,
    getAllPatientByDoctorID,
    disconnect
  })
 // console.log(obj.patientRegister);
  return obj;
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('Database Not Connected'));
    }
   // console.log(connection);
    resolve(repository(connection));
    
  })
}

module.exports = Object.assign({}, {connect})
