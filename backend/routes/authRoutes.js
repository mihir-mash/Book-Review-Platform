const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

router.post('/signup', async(req, res) => {// Signup
  const {username, email, password} = req.body
  try {
    const userExists = await User.findOne({email})
    if (userExists) 
      return res.status(400).json({message: 'Email already in use'})

    const user = new User({username, email, password})
    await user.save()

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.status(201).json({token, username: user.username})
  } 
  catch (err) {
    console.error(err)
    res.status(500).json({message: 'Error creating user'})
  }
})

router.post('/login', async (req, res) => {//Login
  const {email, password} = req.body
  try {
    const user = await User.findOne({email})
    if (!user) 
      return res.status(400).json({message: 'Invalid credentials'})

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) 
      return res.status(400).json({message: 'Invalid credentials'})

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.status(200).json({token, username: user.username})
  }
  catch (err) {
    res.status(500).json({message: 'Login failed'})
  }
})

module.exports = router