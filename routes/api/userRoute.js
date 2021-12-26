const express = require('express');
const brcypt = require('bcrypt');
const router = express.Router();
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//@route            POST api/userRoute/
//@description      signup route
//@access           public

router.post('/', async (req, res) => {
  const data = req.body;
  data.password = await brcypt.hash(data.password, 8);
  const user = new User(data);
  try {
    await user.save();
    res.status(201).send('user successfully created');
  } catch (e) {
    res.status(400).send(e);
  }
});

//@route            POST api/userRoute/logout
//@description      logout current user route
//@access           private

router.get('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    console.log('Logged out. :(');
    res.send('User logged out successfully');
  } catch (e) {
    res.status(500).send();
  }
});

//@route            POST api/userRoute/me
//@description      get logged in user Route
//@access           private

router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user;
    res.send({ user });
  } catch (e) {
    res.status(404).send(e);
  }
});

//@route            POST api/userRoute/login
//@description      login current user route
//@access           public

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      throw new Error('Unable to login, cant find user');
    }
    const isMatch = await brcypt.compare(req.body.password, user.password);
    if (isMatch === false) {
      throw new Error('Unable to login, wrong password');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    const email = user.email;
    res.send({ token });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
