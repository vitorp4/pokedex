import { SearchResultComponent } from './../search-result/search-result.component';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
  loading = false;
  index: number | null = null;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() searchActive = false;
  @Output() searchActiveChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() updatePoke: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('listWrapper') listWrapper!: ElementRef<HTMLDivElement>;
  @ViewChildren(SearchResultComponent, { read: ElementRef })
  listItems!: QueryList<ElementRef>;

  ngOnInit(): void {
    window.addEventListener('click', (event: any) => {
      let isInSearchBarOrEntry = event.path.some(
        (el: any) =>
          el.tagName === 'APP-SEARCH-BAR' || el.tagName === 'APP-ENTRY'
      );
      if (!isInSearchBarOrEntry && this.searchActive) {
        this.searchActiveChange.emit(false);
      }
    });
  }

  toggleSearchActive(bool?: boolean) {
    if (bool !== undefined) {
      setTimeout(() => this.searchActiveChange.emit(bool), 10);
    } else
      setTimeout(() => this.searchActiveChange.emit(!this.searchActive), 10);
    if (!this.searchActive) this.searchInput.nativeElement.focus();
  }

  filterPokemons(event: any) {
    if (
      event.target.value !== '' &&
      event.target.value !== ' ' &&
      event.target.value.length > 2
    ) {
      this.index = null;
      this.loading = true;
      let filteredNames = Array.from(pokemon_names).filter((p) =>
        getPokemonName(p).includes(event.target.value.toLowerCase())
      );

      Promise.all(
        filteredNames.map((p) =>
          this.pokeApiService.getPokemonByName(p).toPromise()
        )
      )
        .finally(() => (this.loading = false))
        .then((result) => (this.pokeResult = result));
    } else if (event.target.value.length <= 2 && this.pokeResult.length > 0) {
      this.index = null;
      this.pokeResult = [];
    }
  }

  emitPokemon(poke: any) {
    this.updatePoke.emit(poke);
  }

  updateListState(index: number, key: 'ArrowUp' | 'ArrowDown') {
    this.listItems.forEach((el) => el.nativeElement.classList.remove('hover'));

    const liElement = this.listWrapper.nativeElement.querySelector(
      `app-search-result:nth-of-type(${this.index ? this.index + 1 : 1})`
    ) as HTMLElement;

    liElement.classList.add('hover');

    switch (key) {
      case 'ArrowUp':
        if (
          index === this.pokeResult.length - 1 ||
          this.listWrapper.nativeElement.scrollTop +
            this.listWrapper.nativeElement.offsetHeight <
            liElement.offsetTop + liElement.offsetHeight
        ) {
          liElement.scrollIntoView(false);
        } else if (
          liElement.offsetTop < this.listWrapper.nativeElement.scrollTop
        ) {
          liElement.scrollIntoView(true);
        }
        break;
      case 'ArrowDown':
        if (
          index === 0 ||
          liElement.offsetTop < this.listWrapper.nativeElement.scrollTop
        ) {
          liElement.scrollIntoView(true);
        } else if (
          this.listWrapper.nativeElement.scrollTop +
            this.listWrapper.nativeElement.offsetHeight <
          liElement.offsetTop + liElement.offsetHeight
        ) {
          liElement.scrollIntoView(false);
        }
        break;
    }
  }

  keydownActions(event: any) {
    const key = event.key;

    if (this.pokeResult.length === 0) {
      return;
    }

    switch (key) {
      case 'ArrowUp':
        event.preventDefault();
        if (this.index === null) {
          this.index = this.pokeResult.length - 1;
        } else if (this.index > 0) {
          this.index -= 1;
        } else if (this.index === 0) {
          this.index = this.pokeResult.length - 1;
        }
        this.updateListState(this.index, key);
        break;
      case 'ArrowDown':
        if (this.index === null) {
          this.index = 0;
        } else if (this.index < this.pokeResult.length - 1) {
          this.index += 1;
        } else if (this.index === this.pokeResult.length - 1) {
          this.index = 0;
        }
        this.updateListState(this.index, key);
        break;
    }
  }

  keyupActions(event: any) {
    const key = event.key;

    switch (key) {
      case 'Enter':
        if (this.pokeResult.length > 0)
          this.emitPokemon(this.pokeResult[this.index ? this.index : 0]);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        break;
      default:
        this.filterPokemons(event);
    }
  }
}
