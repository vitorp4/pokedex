import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as pokemon_names from 'src/app/common/pokemon_names.json';
import { PokeApiService } from 'src/app/services/poke-api.service';

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

  toggleSearchActive(bool: boolean) {
          setTimeout(() => this.searchActiveChange.emit(bool),10)
    
    
  }

  filterPokemons(event: any) {
    if (
      event.target.value !== '' &&
      event.target.value !== ' ' &&
      event.target.value.length > 2
    ) {
      let filteredNames = Array.from(pokemon_names).filter((p) =>
        p.includes(event.target.value)
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
    console.log('oii')
    this.updatePoke.emit(poke);
  }
}
