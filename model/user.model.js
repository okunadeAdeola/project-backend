const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validationType = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
validationType.pre('save',  function (next) {
    bcryptjs.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        } else{
            console.log(hash)
          console.log(this.password)
        }
        this.password = hash;
        next();
    })
})
const validationModel = mongoose.model('Validation', validationType);
module.exports = validationModel;
