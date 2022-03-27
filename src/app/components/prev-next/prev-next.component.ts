import { PokeApiService } from './../../services/poke-api.service';
import { getPokemonName } from '../../common/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-prev-next',
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.scss'],
})
export class PrevNextComponent implements OnInit, OnChanges {
  constructor(private _pokeApiService: PokeApiService) {}

  @Input() pokeId!: number;
  prev!: any;
  next!: any;
  @Output() updatePoke: EventEmitter<any> = new EventEmitter<any>();
  getPokemonName = getPokemonName;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pokeId && changes.pokeId.currentValue !== undefined) {
      this.getPrevAndNextContent();
    }
  }

  getPrevAndNextContent() {
    let ids;
    if (this.pokeId > 1) {
      ids = [this.pokeId - 1, this.pokeId + 1];
      Promise.all(
        ids.map((id) => this._pokeApiService.getPokemonById(id).toPromise())
      ).then((result) => {
        this.prev = result[0];
        this.next = result[1];
      });
    } else {
      this._pokeApiService
        .getPokemonById(this.pokeId + 1)
        .subscribe((result) => (this.next = result));
    }
  }

  emitPreviousPoke() {
    this.updatePoke.emit(this.prev);
  }

  emitNextPoke() {
    this.updatePoke.emit(this.next);
  }
}
