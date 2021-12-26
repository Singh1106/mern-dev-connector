const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const auth = async (req, res, next) => {
 try {
    //console.log('i am in auth');
    const token = req.header('Authorization').replace('Bearer ', '')
    //console.log('token :',token);
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
    if (!user) {
        throw new Error()
    }
    //console.log('user found and sent forward');
    req.token=token;
    req.user=user;
    next()
 } catch (e) {
    console.log(e);
    res.status(401).send({ error: 'Please authenticate.' })
 }
}
module.exports=auth;