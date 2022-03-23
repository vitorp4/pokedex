import { Component, Input, OnInit } from '@angular/core';
import { getPokemonName } from '../../common/common';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() poke: any;
  getPokemonName = getPokemonName;

}
