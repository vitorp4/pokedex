import { PokeApiService } from './../../services/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pokeapi: PokeApiService) {}
  firstPoke!: any;
  pokemons: any[] = [];
  activePokemon: any;

  ngOnInit(): void {
    this.pokeapi
      .getPokemonsByRange(100,251)
      .pipe(take(1))
      .subscribe((result) =>
        Promise.all(
          result.results.map((obj: any) =>
            this.pokeapi.getPokemonByName(obj.name).toPromise()
          )
        ).then((result: any) => {
          this.pokemons = result;
          this.activePokemon = result[0];
        })
      );
  }
}
