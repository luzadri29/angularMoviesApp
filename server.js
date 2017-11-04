// packages
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var http       = require('https');

//define port
var port = (process.env.PORT || 7171);

//api routes
var router = express.Router();

//POST bodyParsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist'));

router.get('/movies/:findBy/:value', function(req, res){
  var lookIn;
  var findBy = req.params.findBy;
  var value = req.params.value;
  console.log('recibing movie call '+ value);

  if(findBy == "movieName"){
    lookIn = "movie";
  }else if(findBy == "actorName"){
    lookIn = "person";
  }

  var options = {
  "method": "GET",
  "hostname": "api.themoviedb.org",
  "port": null,
  "path": "/3/search/"+lookIn+"?query="+value+"&include_adult=false&page=1&language=en-US&api_key=3faf809df83252f672252023c1712984",
  "headers": {}
};
var movieDBReq = http.request(options, function (movieDBRes) {
  var chunks = [];
  movieDBRes.on("data", function (chunk) {
    chunks.push(chunk);
  });

  movieDBRes.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
    res.json(body.toString());
  });
});
  movieDBReq.write("{}");
  movieDBReq.end();
});

app.use('/api', router);

/*app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
*/
app.use(express.static(__dirname + '/dist'));
// start server
app.listen(port, function() {
    console.log("App is running on port " + port);
});
