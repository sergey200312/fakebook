const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    avatar: {
        type: String,
        default: ''
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests: {
        sent: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        received: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    subscriptions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
