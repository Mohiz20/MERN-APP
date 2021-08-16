const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken')

const router = express.Router();

router.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (!user) return res.status(400).send({message:'Invalid email or password'});

  const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey');

  res.send({token, user});
});

router.post('/', async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  await user.save();
  res.send(user);

});

module.exports = router; 