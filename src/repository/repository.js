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
      throw new Error(error);
    }
      
  }

  const patientLogin = async (patient) => {
    
      try{
        const user = await Patient.findByCredentials(patient.email, patient.password);
      const token = await user.generateAuthToken();
      return {user, token};
      }catch(error){
        console.log("Error" + error);
         throw new Error(error);
      }


  }

  const allPatient = async () => {
    
    try {
      const patients = await Patient.find({});
      return patients;  
    } catch (error) {
      console.log("error:" + error);
      throw new Error(error);
    }
    
  }

  const bookAppointment = async (val) => {
    
    try {
      const patient = await Patient.findById(val.patient_id);
      console.log(patient);
      const value = await new CombineCollection({...val, patient_name: patient.name});
      const savedUser =  await value.save();
       return savedUser; 
    } catch (error) {
      console.log("error:" + error);
      throw new Error(error);
    }
    
  }

  const getAllPatientByDoctorID = async (id) => {
    
    try {
      const val = await CombineCollection.findPatientsByID(id);
      return val;
    } catch (error) {
      console.log("error:" + error);
      throw new Error(error);
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
  return obj;
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('Database Not Connected'));
    }
    resolve(repository(connection));
    
  })
}

module.exports = Object.assign({}, {connect})
