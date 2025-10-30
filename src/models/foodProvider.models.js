const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const foodProviderSchema = new mongoose.Schema({
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
    },
    videoURL: [{
        type: String
    }],
    
    phone: {
        type: String,
        required: true
    }
    },{ timestamps: true }
)

foodProviderSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
})

foodProviderSchema.methods.ComparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

foodProviderSchema.methods.generateToken = function(){
    return jwt.sign(
        { id: this._id, name: this.name },
         process.env.JWT_SECRET,
        {expiresIn: '7d'}
        )
    }

const FoodProvider = mongoose.model('FoodProvider', foodProviderSchema);

module.exports = FoodProvider;