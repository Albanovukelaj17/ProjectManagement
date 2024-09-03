const { MongoClient } = require('mongodb');
require('dotenv').config({ path: __dirname + '/../.env' });

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function testConnection() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");
        await client.close();
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

testConnection();
