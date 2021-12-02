const express= require('express');
const router= express.Router();

//@route            api/posts
//@description      test route
//@access           public

router.get('/',(req,res)=>{
    res.send('Posts.js route');
})

module.exports=router;