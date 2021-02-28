const router = require('express').Router();
const Events = require('../model/Events');

// Add event to calendar

router.post('/events', async (req, res) => {
    const event = new Events({
        userID: req.body.userID,
        eventDate: req.body.eventDate,
        title: req.body.title, 
        startTime: req.body.startTime, 
        endTime: req.body.endTime, 
        invitee: req.body.invitee, 
        locationUse: req.body.locationUse, 
        notes: req.body.notes
        
    });

    try {
        const eventRes = await event.save();
        res.send({success: true, message: 'Event added!'})
    } catch (err) {
        console.log(err)
        res.status(400).send(err.response);
    }
});


// Update events for a user

router.put('/events', async (req, res) => {

    const updateEvents = Events.updateOne({ _id: req.body.id }, {
        eventDate: req.body.eventDate,
        title: req.body.title, 
        startTime: req.body.startTime, 
        endTime: req.body.endTime, 
        invitee: req.body.invitee, 
        locationUse: req.body.locationUse, 
        notes: req.body.notes
    });

    try {
        const updateEventsRes = await updateEvents;
        res.send({success: true, message: 'Event amended successfully'});
    } catch (err) {
        console.log(err);
    }
});

// Delete events for a user

router.delete('/events', (req, res) => {

    const deleteEventsReq = Events.deleteOne({_id: req.body.id} , err => {
        if (err) return res.send({success: false, message: 'Error deleting event!' });

        res.send({success: true, message: 'Event successfully deleted'})
    });


});




//Get calendar events for a user

router.post('/get-calendar', async (req, res) => {

    const events = await Events.find({
        userID: req.body.userID,
        
    }).sort({eventDate: 1});

    try {
 
        res.send({success: true, data: events})
    } catch (err) {
        res.status(400).send({success: false, message: err.message})
    }
});

module.exports =  router;

