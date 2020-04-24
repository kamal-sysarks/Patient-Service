const mongoose = require('mongoose');

const combineSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    time: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    }   
});

combineSchema.index({doctor_id : 1, patient_id: 1}, {unique: true});

combineSchema.statics.findPatientsByID = async (id) => {
    const doctor_id = id.doctor_id;
    const result = await CombineCollection.find({doctor_id});
   
    return result;
    // console.log("Hello " + result);
}

const CombineCollection = mongoose.model('combineCollection', combineSchema);

module.exports = CombineCollection;