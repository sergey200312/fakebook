const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    isRead: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Notification', NotificationSchema)