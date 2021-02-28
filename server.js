const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes

const authRoute = require('./routes/auth');
const eventsRoute = require('./routes/events.routes');

dotenv.config();

const PORT = 5000;


// Connect to database

mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('Connected to database'));


//Middleware
app.use(express.json());
app.use(cors());

//Route middleware
app.use(authRoute);
app.use(eventsRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));