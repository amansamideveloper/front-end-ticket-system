const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Travel = require('../../model/Travel');
// const validateBusInput = require('../../validation/bus');
const ethiopianDate = require('ethiopian-date');
const { session } = require('passport/lib');

// text router
router.get('/test', (req, res) => {
    res.status(400).json({ msg: 'Testing BUS router' });
})
// checkin
router.post('/checkin', async (req, res) => {

    const today = new Date();

    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const travel_date = req.body.travel_date.split('/');
    const [travel_day, travel_month, travel_year] = travel_date;


    // const [year, month, date] = ethiopianDate.toEthiopian(yyyy, mm, dd)

    try {

        const checkin = await Travel.find({
            departure: req.body.departure,
            destination: req.body.destination,
        })
        if (checkin.length > 0) {
            const time = checkin.map(function (t) {
                return new Date(t.travel_date).toLocaleDateString()
            })
            time.forEach(function (t) {

                let [date, month, year] = req.body.travel_date.split('-').reverse();

                if (date > 9) {

                    date
                } else {

                    date = date[1]
                }
                if (month > 9) {

                    month
                } else {

                    month = month[1]
                }
                const userYear = date + '/' + month + '/' + year;
                console.log('req', req.body.travel_date)
                console.log('mongodb', t)
                console.log('userdata', userYear)
                console.log(t.typeof)
                if (t === userYear) {

                    res.json(checkin)
                    return
                } else {
                    res.json({ message: 'there is available seats and you can proced to fill the form' })
                    return
                }
            })

        } else {
            res.json({ message: 'we dont have bus to go there we will call you if anything comes' })
            return
        }
    } catch (error) {
        res.json({ 'error': error })
        return
    }
})


// find all buses
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Travel.find().then(travels => res.json({ success: travels }))
        .catch(err => res.json({ error: err }))
})

// add bus 

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    // const { errors, isValid } = validateBusInput(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors)
    // }

    const newTravel = new Travel({
        departure: req.body.departure,
        destination: req.body.destination,
        travel_date: req.body.travel_date,
        description: req.body.description,
        bus: req.body.bus
    });
    newTravel.save()
        .then(travel => res.status(200).json(travel))
        .catch(err => res.status(400).json(err))

})
// update
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    const update = {
        departure: req.body.departure,
        destination: req.body.destination,
        travel_date: req.body.travel_date,
        description: req.body.description,
        bus: req.body.bus
    }

    Travel.findByIdAndUpdate(id, update, {
        new: true
    }).then(updateTravel => res.json({ success: updateTravel }))
        .catch(err => res.json({ error: 'Falied to update' }))

})
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Travel.findById(req.params.id)
        .then(getTravel => res.json({ success: getTravel }))
        .catch(err => res.json({ err: 'Failed to get' }))
})
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Travel.findByIdAndRemove(req.params.id).then(deletBus => res.json({ success: 'Deleted successfully' }))
        .catch(err => res.json({ error: 'Failed to delete ' }))
})
module.exports = router
