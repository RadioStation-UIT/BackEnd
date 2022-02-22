const indexController = require('./_index');
const trackController = require('./track');
const artistsController = require('./artists');
const albumsController = require('./album');
const eventsController = require('./event');
const notificationsController = require('./notification');

function route(app){
    app.use('/api/track',trackController);
    app.use('/api/artist',artistsController);
    app.use('/api/album',albumsController);
    app.use('/api/event',eventsController);
    app.use('/api/notification',notificationsController);
    app.use('/',indexController);
}

module.exports = route;