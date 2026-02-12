const express = require('express');
const cors = require('cors');

const consultantRoutes = require('./routes/consultant.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/consultant', consultantRoutes);

module.exports = app;
