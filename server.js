const dotenv = require('dotenv');
dotenv.config({ path: './config/dev.env' });
const cors = require('cors');
const express = require('express');
const connectDB = require('./db/connectDB.js');
const path = require('path');

const usersRoute = require('./routes/api/userRoute');
const postsRoute = require('./routes/api/postRoute');
const profileRoute = require('./routes/api/profileRoute');

const app = new express();

// Connecting the database with this app.
connectDB();

// init bodyparser middleware
app.use(express.json());

// defining to allow cors
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// not suited for production
// app.get('/', (req, res) => {
//   res.send('Mern dev connector home page.');
// });

// defining api routes
app.use('/api/userRoute', usersRoute);
app.use('/api/profileRoute', profileRoute);
app.use('/api/postRoute', postsRoute);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
