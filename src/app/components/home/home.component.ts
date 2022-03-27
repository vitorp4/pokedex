import { GenResult, gens } from './../gen-dropdown/gen-dropdown.component';
import { SortResult } from './../sort-dropdown/sort-dropdown.component';
import { EntryComponent } from './../entry/entry.component';
import { PokeApiService } from './../../services/poke-api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pokeApiService: PokeApiService) {}
  firstPoke!: any;
  pokemons: any[] = [];
  activePokemon: any;
  @ViewChild(EntryComponent, { read: ElementRef })
  entryCard!: ElementRef<HTMLElement>;
  @ViewChild(SearchBarComponent, { read: ElementRef })
  searchBar!: ElementRef<HTMLElement>;
  pastScrollTop = 0;
  searchActive = false;
  loadingInitial = false;
  loadingGen = false;
  showFabScrollTop = false;

  actualSort: SortResult = {
    by: 'id',
    direction: 'asc'
  }

  ngOnInit(): void {
    this.loadingInitial = true;
    this.pokeApiService
      .getPokemonsByRange(151, 0)
      .pipe(take(1))
      .subscribe((result) =>
        Promise.all(
          result.results.map((obj: any) =>
            this.pokeApiService.getPokemonByName(obj.name).toPromise()
          )
        ).then((result: any) => {
          this.pokemons = result;
          this.onSortResult(this.actualSort);

          this.loadingInitial = false;
        })
      );

    window.onscroll = () => {
      if (window.scrollY === 0) {
        this.showFabScrollTop = false;

        if (this.pastScrollTop !== 0) {
          this.pastScrollTop = 0;
          this.animateEntryCard();
        }
      } else {
        this.showFabScrollTop = true;
      }
    };
  }

  setActivePokemon(poke: any) {
    if (this.pastScrollTop === window.scrollY) {
      this.activePokemon = poke;
    } else {
      this.pastScrollTop = window.scrollY;
      this.animateEntryCard(poke);
    }
  }

  animateEntryCard(poke?: any) {
    this.entryCard.nativeElement.classList.add('hidden');

    setTimeout(() => {
      if (poke) this.activePokemon = poke;
      this.entryCard.nativeElement.style.marginTop = window.scrollY + 'px';
      this.entryCard.nativeElement.style.transform = 'translateX(-30px)';
    }, 250);

    setTimeout(() => {
      this.entryCard.nativeElement.style.transform = 'translateX(0px)';
      this.entryCard.nativeElement.classList.remove('hidden');
    }, 350);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSortResult(event: SortResult) {
    this.pokemons = this.pokemons.sort((a: any, b: any) => {
      if (event.direction === 'asc') {
        if (event.by === 'id') {
          return a.id - b.id;
        } else if (event.by === 'name') {
          return a.name.localeCompare(b.name);
        }
      } else if (event.direction === 'desc') {
        if (event.by === 'id') {
          return b.id - a.id;
        } else if (event.by === 'name') {
          return b.name.localeCompare(a.name);
        }
      }
    });

    this.activePokemon = this.pokemons[0];
    this.actualSort = event;
  }

  onGenResult(event: any) {
    this.loadingGen = true;
    let ranges = [];

    for (const key of Object.keys(event)) {
      if (event[key]) {
        const gen = gens.find(
          (g) => g.id === `${key.slice(0, 3)}-${key.slice(4).toLowerCase()}`
        );

        ranges.push(gen.range);
      }
    }

    Promise.all(
      ranges.map((r) =>
        this.pokeApiService
          .getPokemonsByRange(r.to - r.from, r.from-1)
          .toPromise()
      )
    ).then((result: any) => {
      let result2: any = result.reduce((acc: any, arr: any) => acc.concat(arr.results), []);
      Promise.all(
        result2.map((p: any) =>
          this.pokeApiService.getPokemonByName(p.name).toPromise()
        )
      ).then((result) => {
        this.pokemons = result;
        this.loadingGen = false;
        this.onSortResult(this.actualSort);
      });
    });
  }

  trackPokemonById(index: number, pokemon: any) {
    return pokemon.id;
  }
}
