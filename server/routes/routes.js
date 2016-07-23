var express = require('express');
var router = express.Router();

var Activity = require('../models/activity');
var Rule = require('../models/rule');
var WeMo = require('../controllers/drivers/wemo');

var auth = require('./auth.js');
var drivers = require('./drivers.js');
var user = require('./users.js');

/*
 * Public Routes
 */
router.post('/login', auth.login);
 
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/drivers', drivers.getAll);
router.get('/api/v1/driver/:id', drivers.getOne);
router.post('/api/v1/driver/', drivers.create);
router.put('/api/v1/driver/:id', drivers.update);
router.delete('/api/v1/driver/:id', drivers.delete);
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
 
module.exports = router;



// expose the routes to our app with module.exports
// module.exports = function(app) {

//     // api ---------------------------------------------------------------------
    
//     // app.get('/login', function(req, res) {
//     //         res.sendFile(path.join(__dirname,'./public/vi/login.html'));
//     // });
    
//     app.get('/', function(req, res) {
//             res.sendFile(path.join(__dirname,'../../public/index.html'));
//     });
    
//     // app.get('*', function(req, res) {
//     //         res.sendFile(path.join(__dirname, '../public/views', '/dashboard.html'));
//     // });
    
//     // app.get('/dashboard', function(req, res) {
//     //         res.sendFile(path.join(__dirname,'../../public/dashboard.html'));
//     // });
    
//     // app.get('/rules', function(req, res) {
//     //         res.sendFile(path.join(__dirname, '../../public/views', '/rules.html'));
//     // });
    
//     app.get('/drivers', function(req, res) {
//             res.sendFile(path.join(__dirname, '../../public/app/components/drivers', '/drivers.html'));
//     });
    
//     app.get('/api/v1/driver', function(req, res) {
//         // use mongoose to get all driver records from the database
//         Driver.find(function(err, driver) {
//             //if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err);
//             res.json(driver);
//         });
//     });
    
//     app.get('/api/v1/activity', function(req, res) {
//         // use mongoose to get all activity records from the database
//         Activity.find(function(err, activity) {
//             //if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err);
//             res.json(activity);
//         });
//     });

//     app.get('/api/v1/user', function(req, res) {
//         // use mongoose to get all user records from the database
//         User.find(function(err, user) {
//             //if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err);
//             res.json(user);
//         });
//     });

//     app.get('/api/v1/rules', function(req, res) {
//         // use mongoose to get all user records from the database
//         Rule.find(function(err, rule) {
//             //if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             if (err)
//                 res.send(err);
//             res.json(rule);
//         });
//     });
    
//     app.post('/api/v1/driver/trigger', function(req, res) {
//         // use mongoose to get all driver records from the database
//         logger.log('info','Device trigger for driverID: ' + req.body.driverID + ' for action: ' + req.body.action);

//         Driver.findOne({ _id : req.body.driverID }, function (error, driver){
//             var URI = driver.URI.filter(function (URI) {
//                 return URI.ip;
//             }).pop();
//             logger.log('info', 'Sending request to IP: ' + URI.ip + ', port: ' + URI.port);
//             WeMo.setState(URI.ip, URI.port, req.body.action, function(err, res) {
//                 //if there is an error retrieving, send the error. nothing after res.send(err) will execute
//                 if (err)
//                     res.send(err);
//                 res.json('triggered');
//             })
//         });
//     });

//     app.post('/api/v1/driver', function(req, res) {
//         //create a todo, information comes from AJAX request from Angular
//         Driver.create({
//             text : req.body.text,
//             done : false
//         }, function(err, driver) {
//             if (err)
//                 res.send(err);
//             // get and return all the todos after you create another
//             Driver.find(function(err, driver) {
//                 if (err)
//                     res.send(err)
//                 res.json(driver);
//             });
//         });
//     });
    
//      app.post('/api/v1/activity', function(req, res) {
//         //create a todo, information comes from AJAX request from Angular
//         Activity.create({
//             text : req.body.text,
//             done : false
//         }, function(err, activity) {
//             if (err)
//                 res.send(err);
//             // get and return all the todos after you create another
//             Activity.find(function(err, activity) {
//                 if (err)
//                     res.send(err)
//                 res.json(activity);
//             });
//         });

//     });
    
//      app.post('/api/v1/user', function(req, res) {
//         //create a todo, information comes from AJAX request from Angular
//         User.create({
//             text : req.body.text,
//             done : false
//         }, function(err, user) {
//             if (err)
//                 res.send(err);
//             // get and return all the todos after you create another
//             User.find(function(err, user) {
//                 if (err)
//                     res.send(err)
//                 res.json(user);
//             });
//         });

//     });
// };
