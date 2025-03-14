const express = require('express');
const dotenv = require("dotenv");
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require("path");

// dot config
dotenv.config()

// mongodb connection
connectDB();

// rest object -> to create server
// app contains all express functionality
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev')) // konsa url hit hua h, uska kya response aaya hai, aur sune kitna time liya hai

// routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require("./routes/authRoutes"));
app.use('/api/v1/inventory', require("./routes/inventoryRoutes"));
app.use('/api/v1/analytics', require("./routes/analyticsRoutes"));
app.use('/api/v1/admin', require("./routes/adminRoutes"));

// static folder
app.use(express.static(path.join(__dirname, './client/buid')))

// static routes
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// port 
const PORT = process.env.PORT || 8080;

// listen 
app.listen(PORT, () => {
    console.log(`Node server running in ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgBlue.white);
})