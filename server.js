// server.js
// Require app.js for use
var app = require('./app');
// Set environment port as 5000
var port = process.env.PORT || 5000;

// Connect server to port 5000
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
