import { Component } from '@angular/core';
import { Http }    from '@angular/http';
import { MovieResponse }    from './app.movieresponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  values :string;
  findBy :string;
  currentPageNumber : number;
  movieList = [];
  showDetail:boolean;
  autorDetail:{};
  baseImagesURLPath :string;




  constructor(private http: Http) {
    this.values = '';
    this.currentPageNumber = 1;
    this.findBy = 'movieName';
    this.showDetail = false;
    this.autorDetail = {"name":"default", "profile_path":""};
    this.baseImagesURLPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/"

  }



        onKey(event: any) {
          this.values = event.target.value;
          //this.onClickFind(undefined);
        }

        onClickFind(action) {
          let cPage = this.currentPageNumber;
          let findBy = this.findBy;
          let value = this.values;

          this.showDetail = false;

          if(action != undefined){
            if(action === 'next'){
              cPage++;
            }else  if(action === 'prev' && cPage > 0 ){
              cPage--;
            }

            if(cPage > 0 ){
              this.currentPageNumber = cPage;
            }
          }

          if(value === "" || value === undefined){
              findBy = "nowPlaying";
              cPage  = 1;
              value = "";
          }

            this.getByQuery(findBy, value, cPage).then((val) => {
                let data = val;
                this.movieList = data.results;
                window.scrollTo(0, 0);
            })

      }

        onChange(event: any){
            this.findBy = event.target.value;
        }



        getByQuery(findBy, query, page){
          query =  encodeURIComponent(query);

          return  new Promise<MovieResponse>((resolve, reject) => {
            this.http.get("/api/movies/"+findBy+"?page="+page+"&value="+query)
            .toPromise()
            .then( response => {
              resolve(response.json().data)
            })
            .catch(err => console.log(err))
          });
        }


        getAutorDetail(autorId){
          let cPage = this.currentPageNumber;
          console.log(autorId);
          this.autorDetail = autorId;

          this.getByQuery("actorId", autorId.id, cPage).then((val) => {
              let data = val;
              this.movieList = data.results;
          })

          this.showDetail = true;

        }


        // init default search
        nowPlayingVariable =  this.onClickFind(undefined);


}
