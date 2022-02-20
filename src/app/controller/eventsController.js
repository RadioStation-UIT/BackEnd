const eventDB = require('../models/eventsdb');

class EventController{
    // [GET]
    getAllEvents(req,res, next){
        eventDB.find()
            .then((event)=>{
                console.log(event)
                res.json(event)
            })
            .catch(next)
    }
}

module.exports = new EventController();