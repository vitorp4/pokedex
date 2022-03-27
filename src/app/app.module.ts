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
import { SortGenComponent } from './components/sort-gen/sort-gen.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FabScrollComponent } from './components/fab-scroll/fab-scroll.component';
import { PikachuLoadingComponent } from './components/pikachu-loading/pikachu-loading.component';
import { SortDropdownComponent } from './components/sort-dropdown/sort-dropdown.component';
import { GenDropdownComponent } from './components/gen-dropdown/gen-dropdown.component';
import { FormsModule } from '@angular/forms';

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
    SortGenComponent,
    SearchResultComponent,
    FabScrollComponent,
    PikachuLoadingComponent,
    SortDropdownComponent,
    GenDropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [PokeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
