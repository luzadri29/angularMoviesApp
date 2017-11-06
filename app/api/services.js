
let http       = require('https');
let requestOptions = {
  "method": "GET",
  "hostname": "api.themoviedb.org",
  "port": null,
  "path":"",
  "headers": {}
};

let getMoviesBy = function(req, res){

    var findBy = req.params.findBy;
    var value = req.query.value;
    var currentPage = (req.query.page !== undefined ? req.query.page : 1);
    var urlPath = "";
    var api_key = "3faf809df83252f672252023c1712984";
    var language = "en-US";
    var include_adult = false;
    var autorIdList = [];

    value =  encodeURIComponent(value);

//determines which view should show by the data sent by the user
//movieName = look for movies
//actorName = Look for actors
//nowPlaying = home
//actorId = look for Actor detail with id
    if(findBy == "movieName"){
      urlPath = "/3/search/movie?query="+value+"&";
    }else if(findBy == "actorName"){
     urlPath = "/3/search/person?query="+value+"&";
    }else if(findBy == "nowPlaying"){
      urlPath = "/3/movie/now_playing?";
    }else if(findBy == "actorId"){
        urlPath = "/3/discover/movie?with_cast="+value+"&sort_by=release_date.desc&";
    }

    urlPath += "include_adult="+include_adult+"&page="+currentPage+"&language="+language+"&api_key="+api_key;

    //console.log("Calling URL: "+urlPath);

    requestOptions.path = urlPath;


    var movieDBReq = http.request(requestOptions, function (movieDBRes) {
    var chunks = [];
    var body;
    var data;

    movieDBRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    movieDBRes.on("end", function () {
     body = Buffer.concat(chunks);
      data = JSON.parse(body.toString());
      res.json({"data":data});
    });
  });
    movieDBReq.write("{}");
    movieDBReq.end();
  }




let getMovieDetail = function(req, res){
  var movieId = req.params.movieId;

    requestOptions.path = "/3/movie/"+movieId+"?language=en-US&api_key=3faf809df83252f672252023c1712984";

  var moviedetDBReq = http.request(options, function (moviedetDBRes) {
    var chunks = [];
    var body;
    var data;

    moviedetDBRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    moviedetDBRes.on("end", function () {
       body = Buffer.concat(chunks);
       data = JSON.parse(body.toString());
      res.json({"data":data});
    });

  });
  moviedetDBReq.write("{}");
  moviedetDBReq.end();
}


module.exports =  {
  getMoviesBy,
  getMovieDetail
}
