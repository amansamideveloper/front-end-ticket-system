const express = require('express');

const router = express.Router();
const passport = require('passport');
const Buy = require('../../model/Buy');
const validateBuyInput = require('../../validation/buy');



router.post('/', (req, res) => {

    const { errors, isValid } = validateBuyInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newBuy = new Buy({
        fullname: req.body.fullname,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    });
    newBuy.save()
        .then(buy => res.status(200).json(buy))
        .catch(error => res.status(400).json(error))

})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Buy.find().then(buses => res.send(buses))
        .catch(err => res.json({ error: 'Failed to get all buses' }))
})
module.exports = router;