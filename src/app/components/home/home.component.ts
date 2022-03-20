import { EntryComponent } from './../entry/entry.component';
import { PokeApiService } from './../../services/poke-api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private pokeapi: PokeApiService) {}
  firstPoke!: any;
  pokemons: any[] = [];
  activePokemon: any;
  @ViewChild(EntryComponent, { read: ElementRef })
  entryCard!: ElementRef<HTMLElement>;
  pastScrollTop = 0;

  ngOnInit(): void {
    this.pokeapi
      .getPokemonsByRange(898, 0)
      .pipe(take(1))
      .subscribe((result) =>
        Promise.all(
          result.results.map((obj: any) =>
            this.pokeapi.getPokemonByName(obj.name).toPromise()
          )
        ).then((result: any) => {
          this.pokemons = result;
          this.activePokemon = result[0];
        })
      );

    window.onscroll = () => {
      if (window.scrollY === 0) {
        this.animateEntryCard();
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
}
