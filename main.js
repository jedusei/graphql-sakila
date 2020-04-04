// Initialize and configure server application
const express = require('express');
const app = express();
app.use(express.json());
app.use(require('./GraphQL'));

// Connect to database
const MongoClient = require('./MongoDB').client;
MongoClient.connect()
    .then(() => {
        MongoClient.emit('connect');
        app.listen(process.env.PORT || 5000, () => {
            console.log("Application is running.");
        });
    })
    .catch((err) => {
        console.error("An error occurred while connecting to MongoDB.");
        console.error(err);
        process.exit(1);
    }); 