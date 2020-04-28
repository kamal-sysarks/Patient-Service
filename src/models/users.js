const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('./../config/logger').logger;

var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    phone: {
        type: Number,
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
});

userSchema.methods.toJSON =  function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function(){
    try {
        const user = this;
        const token = jwt.sign({_id: user._id.toString()}, 'flutterPOC');
        user.tokens = user.tokens.concat({token});
        await user.save();
        return token;
    }
    catch(error){
        console.log(error);
        logger.error("Error: In Generating JWT Token.");
        throw new Error("Error: In Generating JWT Token.");
    }
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if(!user){
        logger.info("User Email ID Doesn't Exist");
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        logger.info("Password Doesn't Match.");
        throw new Error('Unable to login');
    }
    logger.info('User Credentials Validated.')
    return user;
}

userSchema.plugin(uniqueValidator);

// Hashing the password
userSchema.pre('save', async function (next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    console.log('Just Before Saving');

    next();
});

const User = mongoose.model('patient', userSchema);

module.exports = User;