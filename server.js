// packages
var express    = require('express');
var app        = express();

//define port
var port = (process.env.PORT || 7171);

//api routes
var router = express.Router();

app.use(express.static(__dirname + '/dist'));


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

//app.use('/api', router);

// start server
app.listen(port, function() {
    console.log("App is running on port " + port);
});
