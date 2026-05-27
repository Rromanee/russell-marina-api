const mongoose = require('mongoose');

const connectDB = async () => {

  try {

    const uri = process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI;

    await mongoose.connect(uri);

    console.log('MongoDB connected');

  } catch (error) {

    console.log(error);

  }

};

module.exports = connectDB;