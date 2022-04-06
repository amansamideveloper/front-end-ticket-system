const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../model/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').SecretOrKey;
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const Task = require('../../model/Task');


router.get('/all', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
        .catch(err => res.json(err));
})


router.get('/test', (req, res) => {
    res.json({ msg: 'users testing' });
});
router.post('/register', (req, res) => {

    const { isValid, errors } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json({ errors })
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exist please try another Email account';
                return res.status(400).json({ errors });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            return res.status(400).json({ err });
                        };
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json({ name: user.name, email: user.email, success: "Register successfully" }))
                            .catch(err => console.log({ err }));
                    });
                });
            }
        });
});
router.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.isAdmin) {
        Task.find().populate('user').then(tasks =>
            res.json({ tasks: tasks }))
    } else {
        res.json({ error: 'you are not allawoded to accesss this point' })
    }

})
router.post('/login', (req, res) => {
    const { isValid, errors } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json({ errors })
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        errors.email = 'Email Not found';
        if (!user) {
            return res.status(404).json({ errors })
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {

                    const payload = { id: user.id, name: user.name, avatar: user.avatar }

                    jwt.sign(
                        payload,
                        keys,
                        { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })

                } else {
                    errors.password = "Password is Incorrect"
                    return res.status(400).json({ errors })
                }

            })
    });
})

module.exports = router