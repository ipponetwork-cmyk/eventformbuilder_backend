const mongoose = require('mongoose');


const dbOptions = {
    serverSelectionTimeoutMS: 60000, // Adjust if needed
    socketTimeoutMS: 60000,
    connectTimeoutMS: 60000,
};

module.exports = () => {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    if (!/^mongodb(\+srv)?:\/\//.test(dbUri)) {
        throw new Error('MONGODB_URI is malformed. It must start with mongodb:// or mongodb+srv://');
    }

    return mongoose.connect(dbUri, dbOptions);
};

