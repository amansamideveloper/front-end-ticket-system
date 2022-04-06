const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const passport = require('passport');
const Task = require('../../model/Task');
const validateTaskInput = require('../../validation/task');

// text router
router.get('/test', (req, res) => {
    res.status(400).json({ msg: 'Testing Task router' });
})

// get my tast
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user._id)
    Task.find({ user: req.user._id })
        .sort({ date: -1 })
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
})
// get tast by id
router.get('/:task_id', (req, res) => {

    Task.findById(req.params.task_id)
        .then(task => res.json(task))
        .catch(err => res.json(err));
})

// add my task
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateTaskInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newTask = new Task({
        text: req.body.text,
        title: req.body.title,
        user: req.user.id
    });
    newTask.save()
        .then(task => res.status(200).json(task))
        .catch(err => res.status(400).json(err))

})
// 


// edit my task

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (task.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not Authorized' })
            }
            task.title = req.body.title,
                task.text = req.body.text
            task.save()
            res.json(task)
        })
        .catch(err => res.json(err));


})



router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {


    Task.findById(req.params.id)
        .then(task => {
            if (task.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not Authorized' })
            }
            task.remove()
                .then(() => res.status(200).json({ success: true }))
        })
        .catch(() => res.status(404).json({ postnotfound: 'Post not found' }));

})




module.exports = router;