import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as pokemon_names from 'src/app/common/pokemon_names.json';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { getPokemonName } from '../../common/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(private pokeApiService: PokeApiService) {}

  pokeResult: any[] = [];
  value = '';

  @Input() searchActive = false;
  @Output() searchActiveChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() updatePoke: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}

  toggleSearchActive(bool?: boolean) {
    if (bool !== undefined)
      setTimeout(() => this.searchActiveChange.emit(bool), 10);
    else setTimeout(() => this.searchActiveChange.emit(!this.searchActive), 10);
  }

  filterPokemons(event: any) {
    if (
      event.target.value !== '' &&
      event.target.value !== ' ' &&
      event.target.value.length > 2
    ) {
      let filteredNames = Array.from(pokemon_names).filter((p) =>
        getPokemonName(p).includes(event.target.value.toLowerCase())
      );

      Promise.all(
        filteredNames.map((p) =>
          this.pokeApiService.getPokemonByName(p).toPromise()
        )
      ).then((result) => (this.pokeResult = result));
    } else if (event.target.value.length <= 2 && this.pokeResult.length > 0) {
      this.pokeResult = [];
    }
  }

  emitPokemon(poke: any) {
    this.updatePoke.emit(poke);
  }
}
