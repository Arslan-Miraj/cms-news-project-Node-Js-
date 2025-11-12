const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    website_title: {
        type: String,
        required: true,
    },
    website_logo: {
        type: String,
        required: true,
        unique: true,
    },    
    footer_description: {
        type: String,
        required: true,                
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
})



const Setting = mongoose.model('Setting', settingsSchema);
module.exports = Setting;
    