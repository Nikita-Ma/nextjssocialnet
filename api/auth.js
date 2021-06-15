const express = require('express')
const router = express.Router()
// Import model
const UserModel = require('../models/UserModel')
const FollowerModel = require('../models/FollowerModel')
const ProfileModel = require('../models/ProfileModel')
//
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const userPng = "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";


router.get('/:username', async (req, res) => {
    const {username} = req.params
    try {
        if (username.length < 1) return res.status(401).send('Invalid')
        if (!username.test(username)) return res.status(401).send('Invalid')

        const user = await UserModel.findOne({username: username.toLowerCase()})
        if (user) return res.status(401).send('Username already taken')
        return res.status(200).send('Available')
    } catch (error) {
        console.error(error)
        return res.status(500).send('Server error')
    }
})
//


router.post('/', async (req, res) => {
    const {

        email,
        password
    } = req.body.user
})
if (!isEmail(email)) return res.status(404).send('Invalid Email')
if (password.length < 6) {
    return res.status(401).send('Password must be >6 symbols')
}
try {

    const user = await UserModel.findOne({email: email.toLowerCase()}).select("+password")
    if (!user) return res.status(401).send('Invalid Cred.')

    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
        return res.status(401).send('Invalid Cred.')
    }
    const payload = {userId: user._id}
    jwt.sign(payload, process.env.jwtSecret,
        {expiresIn: '2d'}, (err, token) => {
            if (err) throw err
            res.status(500).send('Server error')
        })
} catch (error) {

}
//
module.exports = router