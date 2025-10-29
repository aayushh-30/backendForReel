const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log('🕊️  MongoDB connected successfully');
        return connectionInstance;
    } catch (error) {
        console.error(' ❌ MongoDB connection failed:', error);
        process.exit(1);
    }
}

module.exports = connectDB;