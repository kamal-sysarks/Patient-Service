// Repository contains  methods that interact with Database

const Patient = require("../models/users");
const CombineCollection = require("../models/patientdoctor");
const logger = require('../db/logger').logger;


  
  const signUpPatient = async (patient) => {
    try {
      const user = new Patient(patient);
      const savedUser =  await user.save();
      const token = await user.generateAuthToken();
      logger.info(`Patient Signed Up.`);
      return {savedUser, token};
    } catch (error) {
      console.log(error);
      logger.error(`Error: Signing Up Patient ${error.message}`);
      throw new Error(error);
    }
      
  }

  const signInPatient = async (patient) => {
    
    try{
      const user = await Patient.findByCredentials(patient.email, patient.password);
      const token = await user.generateAuthToken();
      logger.info(`Patient Signed In.`);
      return {user, token};
    }catch(error){
      console.log("Error" + error);
      logger.error(`Error: Signing In Specialist ${error}`);
      throw new Error(error);
    }


  }

  const signOutPatient = async (patient) => {
    try {
        const tokensCount =  patient.user.tokens.length;
        patient.user.tokens = patient.user.tokens.filter((token) => {
        return token.token !== patient.token;
      });
      const user = await patient.user.save();
      const message = user.tokens.length<tokensCount ? 'User Signed Out Successfully' : '';
      logger.info(message);
      return message;
    } catch (error) {
      console.log("Error" + error);
      logger.error(`Error: Signing Out Patient ${error}`);
      throw new Error(error);
    }
  }

  const getPatientsList = async () => {
    
    try {
      const patients = await Patient.find({});
      logger.info(`Getting All Patients List`);
      return patients;  
    } catch (error) {
      console.log("error:" + error);
      logger.error(`Error: Getting All Patients List ${error}`);
      throw new Error(error);
    }
    
  }

  const bookAppointment = async (val) => {
    
    try {
      const patient = await Patient.findById(val.patient_id);
      const value = await new CombineCollection({...val, patient_name: patient.name});
      const savedUser =  await value.save();
      logger.info('Booking Appointment Successful');
      return savedUser; 
    } catch (error) {
      console.log("error:" + error);
      logger.error(`Error: Booking Appointment ${error}`);
      throw new Error(error);
    }
    
  }

  const getPatientsListBySpecialist = async (id) => {
    
    try {
      const val = await CombineCollection.findPatientsByID(id);
      logger.info(`Getting Patients List For Specialist`);
      return val;
    } catch (error) {
      console.log("error:" + error);
      logger.error(`Error: Getting All Specialists List ${error}`);
      throw new Error(error);
    }
    
  }


  const obj = Object.create({
    signUpPatient,
    signInPatient,
    signOutPatient,
    getPatientsList,
    bookAppointment,
    getPatientsListBySpecialist
  })



module.exports = obj;
