// packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var apiService = require('./app/api/services');

//define port
var port = (process.env.PORT || 7171);

//api routes
var router = express.Router();

//bodyParsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

//API end points
router.get('/movies/:findBy/', apiService.getMoviesBy);
router.get('/movies/detail/:movieId', apiService.getMovieDetail);

//user API prefix
app.use('/api', router);

// start server
app.listen(port, function() {
    console.log("App is running on port " + port);
});
