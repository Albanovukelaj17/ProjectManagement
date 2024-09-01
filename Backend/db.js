const { MongoClient } = require('mongodb');
require('dotenv').config({ path: __dirname + '/../.env' });


console.log('Mongo URI:', process.env.MONGO_URI);

const uri = process.env.MONGO_URI;

if (!uri) {
    throw new Error('MONGO_URI is not defined. Please add it to your .env file.');
}


const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db();
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

module.exports = connectDB;
