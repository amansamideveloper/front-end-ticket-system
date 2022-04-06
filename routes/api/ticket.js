const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Ticket = require('../../model/Ticket');
const validateBusInput = require('../../validation/bus');
const { session } = require('passport/lib');

// text router
router.get('/test', (req, res) => {
    res.status(400).json({ msg: 'Testing BUS router' });
})

// find all buses
router.get('/', (req, res) => {

    Ticket.find().then(tickets => res.json({ success: tickets }))
        .catch(err => res.json({ error: 'Failed to get all ticets' }))
})

//   



// add bus 

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    // const { errors, isValid } = validateBusInput(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors)
    // }

    const newTicket = new Ticket({
        name: req.body.name,
        description: req.body.description

    });
    newTicket.save()
        .then(ticket => res.status(200).json(ticket))
        .catch(err => res.status(400).json(err))

})
// update
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    const update = {
        name: req.body.name,
        description: req.body.description,
    }

    Ticket.findByIdAndUpdate(id, update, {
        new: true
    }).then(updateTicket => res.json({ success: updateTicket }))
        .catch(err => res.json({ error: 'Falied to update' }))

})
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Ticket.findById(req.params.id)
        .then(getTicket => res.json({ success: getTicket }))
        .catch(err => res.json({ err: 'Failed to get' }))
})
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Ticket.findByIdAndRemove(req.params.id).then(deletTicket => res.json({ success: 'Deleted successfully' }))
        .catch(err => res.json({ error: 'Failed to delete ' }))
})
module.exports = router
