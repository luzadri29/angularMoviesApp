import { Component } from '@angular/core';

import { Movies } from './app.movies';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title : string;
//  changeTitleP : string;

  constructor(private movie: Movies ) {}


 changeTitle = this.movie.changeTitleP()
      .then((val) => this.title = val);


getNowPlaying = this.movie.getNowPlaying()
        .then((val) => {
          let data = val;
          console.log(data.page);
          console.log(data.results);
          this.movie.movieList = data.results;
        })

}
