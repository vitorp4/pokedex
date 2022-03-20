import { IPokemon } from './../../services/poke-api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { getPokemonName } from '../../common/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  gif = false;
  getPokemonName = getPokemonName;

  @Input() poke!: any;

  getThreeDigits(id: number): string {
    let value = id.toString();

    if (value.length == 1) return '00' + value;
    else if (value.length == 2) return '0' + value;
    else return value;
  }
}
