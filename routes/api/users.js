const express= require('express');
const router= express.Router();

//@route            api/users
//@description      test route
//@access           public

router.get('/',(req,res)=>{
    res.send('Users.js route');
})

module.exports=router;