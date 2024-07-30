/*
=======================================================================
SETUP
======================================================================= */


const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')

const PORT = process.env.PORT || 3000;


/*
--------------- DB Setup --------------- */
const usersRouter = require('./controllers/users.js')

/*
--------------- Controllers --------------- */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


/*
--------------- Middleware --------------- */
app.use(cors());
app.use(express.json());



/*
=======================================================================
ROUTES
======================================================================= */
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/users', usersRouter)


app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(PORT, () => {``
    console.log(`Server is running on http://localhost:${PORT}`);
  });

