import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { StatsComponent } from './components/stats/stats.component';
import { EntryComponent } from './components/entry/entry.component';
import { EvolutionComponent } from './components/evolution/evolution.component';
import { PrevNextComponent } from './components/prev-next/prev-next.component';
import { RouterModule } from '@angular/router';
import { PokeApiService } from './services/poke-api.service';
import { SearchButtonComponent } from './components/search-button/search-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SortRangeComponent } from './components/sort-range/sort-range.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';

const routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    StatsComponent,
    EntryComponent,
    EvolutionComponent,
    PrevNextComponent,
    SearchButtonComponent,
    SearchBarComponent,
    SortRangeComponent,
    FilterBarComponent,
    FilterSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
