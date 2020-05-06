const mongoose = require('mongoose');
const logger = require('./../db/logger').logger;

const bookingSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: false,
      
    },
    patient_name:{
        type: String,
        required: true
    },
    // patient_pic:{
    //     type: Buffer,
        
    // },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }   
});

bookingSchema.index({doctor_id : 1, patient_id: 1}, {unique: true});

bookingSchema.statics.findPatientsByID = async (id) => {
    const doctor_id = id.doctor_id;
    const result = await CombineCollection.find({doctor_id});
    console.log(result);
    if(result.length === 0){
        logger.error("Specialist Doesn't have Appointments.");
        throw new Error("Specialist Doesn't have Appointments.");
    }
    return result;
    // console.log("Hello " + result);
}

const CombineCollection = mongoose.model('BookingDetails', bookingSchema);

module.exports = CombineCollection;