const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VerificationCodeSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String, 
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

module.exports =  mongoose.model('VerificationCode', VerificationCodeSchema);