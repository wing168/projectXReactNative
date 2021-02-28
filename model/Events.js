const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
        
    },
    eventDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    invitee: {
        type: String,
        default: 'N/A'
    },
    locationUse: {
        type: String,
        default: 'N/A'
    },
    notes: {
        type: String,
        default: 'N/A'
    }
    // eventData: {
    //     [dateKey]: 
    //         [
    //             {
    //                 id: {
    //                     type: String,
    //                     required: true
    //                 },
    //                 title: {
    //                     type: String,
    //                     required: true
    //                 },
    //                 startTime: {
    //                     type: String,
    //                     required: true
    //                 },
    //                 endTime: {
    //                     type: String,
    //                     required: true
    //                 },
    //                 invitee: {
    //                     type: String,
    //                     default: 'N/A'
    //                 },
    //                 locationUse: {
    //                     type: String,
    //                     default: 'N/A'
    //                 },
    //                 notes: {
    //                     type: String,
    //                     default: 'N/A'
    //                 }
    //             }
    //         ]
        
    // }

});

module.exports = mongoose.model('Events', eventSchema);