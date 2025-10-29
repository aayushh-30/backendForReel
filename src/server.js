const express = require('express')
const cookierParser = require('cookie-parser');


const app = express()

app.use(express.json());
app.use(cookierParser());


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api',require('./routes'))

module.exports = app;