const indexController = require('./_index');

function route(app){
    app.use('/',indexController);
}

module.exports = route;