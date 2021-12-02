const dotenv=require('dotenv');
dotenv.config({path:'./config/dev.env'});

const express=require('express');
const connectDB=require('./db/connectDB.js');

const usersRoute=require('./routes/api/users');
const postsRoute=require('./routes/api/posts');
const profileRoute=require('./routes/api/profile');
const authRoute=require('./routes/api/auth');

const app=new express();

// Connecting the database with this app.
connectDB();

app.get('/',(req,res)=>{
    res.send('Mern dev connector home page.');
})

// defining api routes
app.use('/api/users',usersRoute);
app.use('/api/auth',authRoute);
app.use('/api/profile',profileRoute);
app.use('/api/posts',postsRoute);

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`Listening at port: ${port}`);
})
