import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnInit(): void {}

  @Input() stat!: string;
  @Input() value!: number;
  abreviation: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stat) {
      this.abreviation = this.getAbreviation(changes.stat.currentValue);
    }
  }

  getAbreviation(stat: string): string {
    switch (stat) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'ATK';
      case 'defense':
        return 'DEF';
      case 'special-attack':
        return 'SpA';
      case 'special-defense':
        return 'SpD';
      case 'speed':
        return 'SPD';
      case 'total':
        return 'TOT';
      default:
        return '';
    }
  }
}
