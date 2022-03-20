import { PokeApiService } from './../../services/poke-api.service';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { getPokemonName } from '../../common/common';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit, OnChanges {
  constructor(private _pokeApiService: PokeApiService) {}

  @Input() pokemon!: any;
  totalStatValue!: number;
  typesInfo!: any[];
  weakness!: string[];
  getPokemonName = getPokemonName;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.pokemon && changes.pokemon.currentValue !== undefined) {
      this.updateState();
    }
  }

  setTotalStatValue() {
    this.totalStatValue = this.pokemon?.stats
      .map((poke: any) => poke.base_stat)
      .reduce((accum: number, stat: any) => (accum += stat));
  }

  setWeaknessTypes() {
    Promise.all(
      this.pokemon.types.map((type: any) =>
        this._pokeApiService.getTypeByName(type.type.name).toPromise()
      )
    ).then((result) => {
      this.typesInfo = result;
      this.calculateWeakness();
    });
  }

  calculateWeakness() {
    if (this.typesInfo.length === 1) {
      this.weakness = this.typesInfo[0].damage_relations.double_damage_from.map(
        (i: any) => i.name
      );
      console.log(this.weakness);
    } else {
      let aux: string[] = [];

      [
        [0, 1],
        [1, 0],
      ].forEach((a) => {
        this.typesInfo[a[0]].damage_relations.double_damage_from.forEach(
          (i: any) => {
            if (
              this.typesInfo[a[1]].damage_relations.double_damage_from.some(
                (j: any) => i.name === j.name
              ) ||
              (!this.typesInfo[a[1]].damage_relations.half_damage_from.some(
                (j: any) => i.name === j.name
              ) &&
                !this.typesInfo[a[1]].damage_relations.no_damage_from.some(
                  (j: any) => i.name === j.name
                ))
            ) {
              aux.push(i.name);
            }
          }
        );
      });

      this.weakness = Array.from(new Set(aux));
    }
  }

  updateState() {
    this.setTotalStatValue();
    this.setWeaknessTypes();
  }

  updatePokemon(event: any) {
    this.pokemon = event;
    this.updateState();
  }
}
