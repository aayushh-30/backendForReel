const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    
    },
    password: {
        type: String,
        required: true,
    },

},{
    timestamps: true
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.ComparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function(){
    return jwt.sign(
        { id: this._id, username: this.username },
         process.env.JWT_SECRET,
        {expiresIn: '7d'}
        )

}

const users = mongoose.model('users', userSchema);

module.exports = users;
