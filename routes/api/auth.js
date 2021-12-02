const express= require('express');
const router= express.Router();

//@route            api/auth
//@description      test route
//@access           public

router.get('/',(req,res)=>{
    res.send('Auth.js route');
})

module.exports=router;