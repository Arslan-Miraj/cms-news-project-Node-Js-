const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,   
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    slug: {
        type: String,
        required: true,
        unique: true,        
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
});

categorySchema.pre('validate', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
    