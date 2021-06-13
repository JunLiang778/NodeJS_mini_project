const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
}, {timestamps:true});
//auto create a timestamp obj for our blog documents 

/*naming of 'Blog' inside .model() is important bc it's gonna look at this name, pluralize
it and then look for that collection inside the db whenever we use this model in the 
future to communicate with the db */
const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;