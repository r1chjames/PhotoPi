// server.js

    // set up =====================================================================
    var express         = require('express');
    var Agenda          = require('agenda');                        // import out agenda
    var app             = express();                                // create our app w/ express
    var mongoose        = require('mongoose');                      // mongoose for mongodb
    var morgan          = require('morgan');                        // log requests to the console (express4)
    var bodyParser      = require('body-parser');                   // pull information from HTML POST (express4)
    var methodOverride  = require('method-override');               // simulate DELETE and PUT (express4)
    var host            = process.env.IP;                           // listening address
    var port            = process.argv[2] || process.env.PORT;      // pass in the port from command line or automatically select the port
    var env             = process.argv[3] || 'DEV';                 // TODO make config files for environments
    var environment     = require('./server/config/' + env);        // import database config
    var loggly          = require('./server/config/logger');        // configure loggly logging
    var logger          = require('winston');                       // dependency for logging
    var agenda          = new Agenda({db: {address: environment.database_url, collection: 'scheduler'}});     // configure agenda scheduler

    // configuration ===============================================================
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(methodOverride('X-HTTP-Method-Override')); 
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    //app.use(methodOverride());

    // routes =======================================================================
    app.use('/', require('./server/routes/routes.js'));
    app.all('/*', function(req, res, next) {
      // CORS headers
      res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      // Set custom headers for CORS
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
      if (req.method == 'OPTIONS') {
        res.status(200).end();
      } else {
        next();
      }
    });
     
    // Auth Middleware - This will check if the token is valid
    // Only the requests that start with /api/v1/* will be checked for the token.
    // Any URL's that do not follow the below pattern should be avoided unless you 
    // are sure that authentication is not needed
    app.all('/api/v1/*', [require('./server/middleware/validateRequest')]);
     
    // If no route is matched by now, it must be a 404
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    
    // database ===============================================================
    mongoose.connect(environment.database_url);                     // connect to mongoDB database
    var db = mongoose.connection;

    // listen (start app and connect to db) =========================================
    logger.log('info','================= App Starting =================');
    
    db.once('open', function callback () {
        logger.log('info',"Connected to MongoDB at: " + environment.database_url);
        app.listen(port);
        logger.log('info','App listening at: ' + host + ':' + port);
    });
    
    db.on('error', function callback () {
        logger.log('error',"Failed to connect to MongoDB at: " + environment.database_url);
        logger.log('error', "Application NOT started");
        process.exit();
    });
    
    exports = module.exports = app; 

