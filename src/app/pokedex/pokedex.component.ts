import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, filter } from 'rxjs';
import { PokemonCache, Pokemon } from './pokemon.service';

interface apiReturn {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

const CURRENT_POKEMON_TOTAL = 905;

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
      .get<apiReturn>('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .pipe(
        tap((results: apiReturn) => {
          this.apiMap(results);
        })
      )
      .subscribe();

    this.cacheCopy = this.pokemonCache.pokemonCache;
  }

  apiMap(data: apiReturn): void {
    this.allData = {
      count: data.count,
      namesList: data.results
        .filter((element, index: number) => index < CURRENT_POKEMON_TOTAL)
        .map((element: { name: string; url: string }) => element.name),
    };
  }

  navigate(dexNum: number): void {
    this.router.navigateByUrl(`/Pokedex/${dexNum}`);
  }
}
