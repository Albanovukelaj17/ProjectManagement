// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(); // Optional: Du kannst hier die DB-Instanz zurückgeben
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err; // Wichtig: Fehler sollten geworfen werden, damit sie behandelt werden können
  }
}

module.exports = connectDB;
