const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Connect to MongoDB
MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Connected to MongoDB');

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
