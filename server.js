const express=require('express');

const app=new express();

app.get('/1',(req,res)=>{
    res.send('Mern dev connector home page.');
})

const port=process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Listening at port: ${port}`);
})
