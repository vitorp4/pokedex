import { PokeApiService } from './../../services/poke-api.service';
import { getPokemonName } from '../../common/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss'],
})
export class EvolutionComponent implements OnInit, OnChanges {
  constructor(private pokeApiService: PokeApiService) {}
  getPokemonName = getPokemonName;
  @Input() poke!: any;
  @Output() updatePoke: EventEmitter<any> = new EventEmitter<any>();
  chainLength!: number;
  evolutionChain!: any;
  pokemonSpecies: any;

  pokemon1!: any;
  pokemon2: any[] = [];
  pokemon3: any[] = [];

  chain!: any;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.poke && changes.poke.currentValue !== undefined) {
      this.getPokemonSpecies();
    }
  }

  getPokemonSpecies() {
    this.pokeApiService
      .getPokemonSpeciesById(this.poke.id)
      .subscribe((result) => {
        this.pokemonSpecies = result;

        this.pokeApiService
          .getEvolutionChainByUrl(this.pokemonSpecies.evolution_chain.url)
          .subscribe((result) => {
            this.chain = result;
            this.chainLength = 1;

            this.pokeApiService
              .getPokemonById(this.chain.chain.species.url.split('/')[6])
              .subscribe((result) => (this.pokemon1 = result));

            if (this.chain.chain.evolves_to.length > 0) {
              this.chainLength = 2;
              Promise.all(
                this.chain.chain.evolves_to.map((evo1: any) =>
                  this.pokeApiService
                    .getPokemonById(evo1.species.url.split('/')[6])
                    .toPromise()
                )
              ).then((result) => (this.pokemon2 = result));
            }
            if (
              this.chain.chain.evolves_to.length > 0 &&
              this.chain.chain.evolves_to[0].evolves_to.length > 0
            ) {
              this.chainLength = 3;
              Promise.all(
                this.chain.chain.evolves_to
                  .map((evo1: any) =>
                    evo1.evolves_to.map((evo2: any) =>
                      this.pokeApiService
                        .getPokemonById(evo2.species.url.split('/')[6])
                        .toPromise()
                    )
                  )
                  .flat()
              ).then((result) => (this.pokemon3 = result));
            }
          });
      });
  }

  getImgSrcEvolutionTrigger(all_evo_details: any[], evolve_to_specie: string) {
    let evo_details: any;

    switch (evolve_to_specie) {
      case 'leafeon':
        evo_details = all_evo_details[4];
        break;
      case 'glaceon':
        evo_details = all_evo_details[4];
        break;
      case 'sylveon':
        evo_details = all_evo_details[1];
        break;
      default:
        evo_details = all_evo_details[0];
    }

    let appendPath = '';

    switch (evo_details.trigger.name) {
      case 'level-up':
        if (evo_details.min_level) {
          appendPath += `l${evo_details.min_level}`;
        } else if (evo_details.min_happiness) {
          appendPath += 'happiness';
          appendPath += evo_details.time_of_day ? evo_details.time_of_day : '';
        } else if (evo_details.held_item) {
          appendPath += 'level';
          appendPath += evo_details.time_of_day ? evo_details.time_of_day : '';
          appendPath += evo_details.held_item.name.split('-').join('');
        } else if (evo_details.known_move) {
          appendPath += 'level';
          appendPath += evo_details.known_move.name.split('-').join('');
        } else if (evo_details.location) {
          appendPath += 'level';
          appendPath +=
            evo_details.location.name === 'mt-coronet' ? 'coronet' : '';
        } else if (evo_details.min_beauty) {
          appendPath += 'levelpokeblock';
        } else if (evo_details.party_species) {
          appendPath += 'level';
          appendPath +=
            evo_details.party_species.name === 'remoraid' ? 'remoraid223' : '';
        }
        break;
      case 'trade':
        appendPath += 'trade';
        if (evo_details.held_item) {
          appendPath +=
            evo_details.held_item.name === 'kings-rock'
              ? "king'srock"
              : evo_details.held_item.name.split('-').join('');
        }
        break;
      case 'use-item':
        if (evo_details.gender) {
          appendPath += evo_details.gender === 1 ? 'female' : 'male';
        }
        appendPath += evo_details.item.name.split('-').join('');
        break;
      case 'three-critical-hits':
        appendPath += 'lbattles';
        break;
      case 'shed':
        appendPath += 'levelpokeball20';
        break;
    }

    return `https://www.serebii.net/pokedex-swsh/evoicon/${appendPath}.png`;
  }

  emitPoke(poke: any) {
    this.updatePoke.emit(poke);
  }
}
