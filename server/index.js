const {client,
    createTables} = require('./db');

const express = require('express');
const app = express();
app.use(express.json());

const init = async () => {
    await client.connect();
    console.log('connecting to db');
    await createTables();
    console.log('tables created');
};

init();