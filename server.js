// packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var apiService = require('./app/api/services');

//define port
var port = (process.env.PORT || 7171);

//api routes
var router = express.Router();

//POST bodyParsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

router.get('/movies/:findBy/', apiService.getMoviesBy);

router.get('/movies/detail/:movieId', apiService.getMovieDetail);

app.use('/api', router);

// start server
app.listen(port, function() {
    console.log("App is running on port " + port);
});
