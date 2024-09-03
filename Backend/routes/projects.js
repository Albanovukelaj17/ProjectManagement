const express = require('express');
const connectDB = require('../db'); // Importiere die connectDB-Funktion

const router = express.Router();

router.get('/data', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('myCollection');
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
