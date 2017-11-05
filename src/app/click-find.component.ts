import { Component } from '@angular/core';
import { Movies } from './app.movies';

@Component({
  selector: 'app-click-find',
  template: `<select (change)="onChange($event)" class="selectpicker">
  <option value="movieName">Movie</option>
  <option value="actorName">Actor</option>
  </select>
<button (click)="onClickFind()">Find</button> <input (keyup)="onKey($event)">`
})
export class ClickFindComponent {
  clickMessage = '';
  values = '';
  findBy = 'movieName';

  constructor(private movie: Movies ) {}

  onKey(event: any) { // without type info
    this.values = event.target.value;
  }

  onClickFind() {
    console.log("Siiiii entraaaaaaaaaaaaaaaaa");
    this.movie.getByQuery(this.findBy, this.values).then((val) => {
      let data = val;
      console.log(data.page);
      console.log(data.results);
      this.movie.movieList = data.results;
  })
}

  onChange(event: any){
      console.log("onChange escuchando "+ event.target.value);
      this.findBy = event.target.value;
  }
}
