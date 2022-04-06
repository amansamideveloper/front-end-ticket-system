const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const passport = require('passport');
const Bus = require('../../model/Bus');
const validateBusInput = require('../../validation/bus');
const { session } = require('passport/lib');

// text router
router.get('/test', (req, res) => {
    res.status(400).json({ msg: 'Testing BUS router' });
})

// find all buses
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Bus.find().then(buses => res.json({ success: buses }))
        .catch(err => res.json({ error: 'Failed to get all buses' }))
})

// add bus 

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateBusInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newBus = new Bus({
        name: req.body.name,
        description: req.body.description,
        seats: req.seats
    });
    newBus.save()
        .then(bus => res.status(200).json(bus))
        .catch(err => res.status(400).json(err))

})
// update
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    const update = {
        name: req.body.name,
        description: req.body.description,
        seats: req.body.seats
    }

    Bus.findByIdAndUpdate(id, update, {
        new: true
    }).then(updateBus => res.json({ success: updateBus }))
        .catch(err => res.json({ error: 'Falied to update' }))

})
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Bus.findById(req.params.id)
        .then(getBus => res.json({ success: getBus }))
        .catch(err => res.json({ err: 'Failed to get' }))
})
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Bus.findByIdAndRemove(req.params.id).then(deletBus => res.json({ success: 'Deleted successfully' }))
        .catch(err => res.json({ error: 'Failed to delete ' }))
})
module.exports = router
