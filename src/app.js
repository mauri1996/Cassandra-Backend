/*jshint esversion: 6 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 

const app = express();



app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/datos', require('./routes/datos.routes'));
app.use(cors());

module.exports = app;
