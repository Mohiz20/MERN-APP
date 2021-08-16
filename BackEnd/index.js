const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const lead = require('./routes/leads');
const cors = require('cors')
const app = express();

mongoose.connect('mongodb://localhost/leaddata')
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.log('Error connecting', err));


app.use(cors())
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/lead', lead);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));