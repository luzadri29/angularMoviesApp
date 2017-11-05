
var http       = require('https');

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
    console.log('recibing movie call '+ value);


    if(findBy == "movieName"){
      urlPath = "/3/search/movie?query="+value+"&";
    }else if(findBy == "actorName"){
     urlPath = "/3/search/person?query="+value+"&";
    }else if(findBy == "nowPlaying"){
      urlPath = "/3/movie/now_playing?";
    }

    urlPath += "include_adult="+include_adult+"&page="+currentPage+"&language="+language+"&api_key="+api_key;

    //console.log("Calling URL: "+urlPath);

    var options = {
      "method": "GET",
      "hostname": "api.themoviedb.org",
      "port": null,
      "path":urlPath,
      "headers": {}
    };
    var movieDBReq = http.request(options, function (movieDBRes) {
    var chunks = [];
    movieDBRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    movieDBRes.on("end", function () {
      var body = Buffer.concat(chunks);
      var data = JSON.parse(body.toString());
      res.json({data:data});
    });
  });
    movieDBReq.write("{}");
    movieDBReq.end();
  }




let getMovieDetail = function(req, res){
  var movieId = req.params.movieId;
  console.log('recibing movie detail call '+ value);

  var options = {
  "method": "GET",
  "hostname": "api.themoviedb.org",
  "port": null,
  "path":  "/3/movie/"+movieId+"?language=en-US&api_key=3faf809df83252f672252023c1712984",
  "headers": {}
};
var moviedetDBReq = http.request(options, function (moviedetDBRes) {
  var chunks = [];
  moviedetDBRes.on("data", function (chunk) {
    chunks.push(chunk);
  });

  moviedetDBRes.on("end", function () {
    var body = Buffer.concat(chunks);
    //console.log(body.toString());
    var data = JSON.parse(body.toString());
    res.json({data:data});
  });
});
  moviedetDBReq.write("{}");
  moviedetDBReq.end();
}

let getActorDetail = function(){



}



module.exports =  {
  getMoviesBy,
  getMovieDetail
}
