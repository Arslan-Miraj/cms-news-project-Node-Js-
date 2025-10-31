const mongoose = require('mongoose');






const commentSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'News',  
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        required: true,
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});



const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;
    