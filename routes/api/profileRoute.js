const request = require('request');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profileModel');
const User = require('../../models/userModel');
const Post = require('../../models/postModel');

//@route            POST api/profileRoute/me
//@description      Get user's profile
//@access           private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      'user',
      ['name', 'email']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'This user doesnt have a profile' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
});

//@route            POST api/profileRoute/
//@description      Create or update user's profile
//@access           private

router.post('/', auth, async (req, res) => {
  // destructure the request
  const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

  // build a profile
  const profileFields = {
    user: req.user.id,
    website: website && website !== '' ? website : '',
    skills: Array.isArray(skills)
      ? skills
      : skills.split(',').map((skill) => ' ' + skill.trim()),
    ...rest,
  };

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0) socialFields[key] = value;
  }
  // add to profileFields
  profileFields.social = socialFields;

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//@route            GET api/profileRoute/
//@description      get all profiles
//@access           public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email']);
    res.send(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route            GET api/profileRoute/user/user_id
//@description      get profile by user id
//@access           public

router.get('/user/:userid', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userid }).populate(
      'user',
      ['name', 'email']
    );
    if (profile) {
      res.send(profile);
    } else {
      res.status(400).send('Profile not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route            DElETE api/profileRoute/
//@description      Delete user and profile
//@access           private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user._id }),
      User.findOneAndRemove({ _id: req.user._id }),
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profileRoute/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profileRoute/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/profileRoute/education
// @desc     Add profile education
// @access   Private
router.put('/education', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(req.body);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profileRoute/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/profileRoute/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
  //console.log(process.env.GITHUB_CLIENT_ID);
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        res.status(404).send('No github profile found');
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;
