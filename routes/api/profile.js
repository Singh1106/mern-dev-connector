const express= require('express');
const router= express.Router();

//@route            api/profile
//@description      test route
//@access           public

router.get('/',(req,res)=>{
    res.send('Profile.js route');
})

module.exports=router;