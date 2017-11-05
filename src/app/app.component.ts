import { Component } from '@angular/core';
import { Http }    from '@angular/http';
import { MovieResponse }    from './app.movieresponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title : string;
  clickMessage = '';
  values = '';
  findBy = 'movieName';
  movieList = [];
  result = 'from movies';


  constructor(private http: Http, ) { }


  nowPlayingVariable =  this.getNowPlaying()
        .then((val) => {
          let data = val;
          console.log(data.page);
          console.log(data.results);
          this.movieList = data.results;
        })


        onKey(event: any) { // without type info
          this.values = event.target.value;
        }

        onClickFind() {
          this.getByQuery(this.findBy, this.values).then((val) => {
            let data = val;
            //console.log(data.results);
            this.movieList = data.results;
        })
      }

        onChange(event: any){
            console.log("onChange escuchando "+ event.target.value);
            this.findBy = event.target.value;
        }


        getNowPlaying(){
           return  new Promise<MovieResponse>((resolve, reject) => {
             this.http.get("/api/movies")
             .toPromise()
             .then( response => {
               resolve(response.json().data)
             })
             .catch(err => console.log(err))
           });
        }

        getByQuery(findBy, query){
          return  new Promise<MovieResponse>((resolve, reject) => {
            this.http.get("/api/movies/"+findBy+"/"+query)
            .toPromise()
            .then( response => {
              resolve(response.json().data)
            })
            .catch(err => console.log(err))
          });
        }


}
