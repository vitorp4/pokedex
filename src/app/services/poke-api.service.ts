import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  getPokemonByName(name: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get(url);
  }

  getPokemonById(id: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get(url);
  }

  getPokemonByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonsByRange(limit: number, offset: number): Observable<any> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    const url = `https://pokeapi.co/api/v2/pokemon`;
    return this.http.get(url, { params });
  }

  getTypeByName(name: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/type/${name}`;
    return this.http.get(url);
  }

  getPokemonSpeciesById(id: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    return this.http.get(url);
  }

  getPokemonSpeciesByName(name: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    return this.http.get(url);
  }

  getEvolutionChainById(id: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/evolution-chain/${id}`;
    return this.http.get(url);
  }

  getEvolutionChainByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
}
