const mongoose = require('mongoose');
const BlogDetailsSchema = new mongoose.Schema({
    title:{
         type: String,
         require: [true,"Title is a required field."]
    },
    content:{
        type: String,
        require: [true,"Content is a required field."]
    },
    imageUrl: {
        type: String,
        require: [true,"ImagUrl is a required field."]
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
    userId:{
        type: String
    }
},{versionKey:false});

const Blog = mongoose.model('Blog', BlogDetailsSchema);
module.exports = Blog;