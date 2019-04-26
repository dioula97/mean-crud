const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/CrudDb', {useNewUrlParser: true}, (err, db) =>{
    if(err) throw err;

    console.log("connected!");
});

module.exports = mongoose;