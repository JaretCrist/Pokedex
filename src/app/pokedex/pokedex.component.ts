import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { PokemonCache, Pokemon } from './pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private pokemonCache: PokemonCache
  ) {}

  allData: {
    count: number;
    namesList: string[];
  } = { count: 0, namesList: [] };

  cacheCopy: Pokemon[] = [];

  ngOnInit(): void {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .pipe(
        tap((results) => {
          this.apiMap(results);
        })
      )
      .subscribe();

    this.cacheCopy = this.pokemonCache.pokemonCache;
  }

  apiMap(data: any): void {
    this.allData = {
      count: data.count,
      namesList: data.results.map(
        (element: { name: string; url: string }) => element.name
      ),
    };
  }

  navigate(dexNum: number): void {
    this.router.navigateByUrl(`/Pokedex/${dexNum}`);
  }
}
