import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, mergeMap, of, tap } from 'rxjs';
import { Pokemon, pokemonCache } from '../pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  allData: Pokemon | null = null;
  currentPokemon: string | null = null;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params) => (params.get('pokemon') ? true : false)),
        mergeMap((params) => {
          this.currentPokemon = params.get('pokemon');
          if (this.currentPokemon)
            return this.httpClient.get(
              `https://pokeapi.co/api/v2/pokemon/${this.currentPokemon}/`
            );
          throw new Error('Current pokemon not found');
        }),
        tap((data) => {
          if (data) {
            this.allData = this.dataMap(data);
            if (this.currentPokemon) {
              console.log(this.currentPokemon, typeof this.currentPokemon);
              const tempNum = Number(this.currentPokemon);
              if (!isNaN(tempNum) && !pokemonCache[tempNum]) {
                pokemonCache[tempNum] = this.allData;
              }
            }
          } else {
            throw new Error('Pokemon not found, no data returned');
          }
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      )
      .subscribe();
  }

  dataMap(data: any): Pokemon {
    const transformedData: Pokemon = {
      id: data.id,
      name: data.name,
      base_experience: data.base_experience,
      height: data.height,
      weight: data.weight,
      types: data.types,
      stats: {
        hp: {
          base_stat: data.stats[0].base_stat,
          effort: data.stats[0].effort,
        },
        atk: {
          base_stat: data.stats[1].base_stat,
          effort: data.stats[1].effort,
        },
        def: {
          base_stat: data.stats[2].base_stat,
          effort: data.stats[2].effort,
        },
        spAtk: {
          base_stat: data.stats[3].base_stat,
          effort: data.stats[3].effort,
        },
        spDef: {
          base_stat: data.stats[4].base_stat,
          effort: data.stats[4].effort,
        },
        spd: {
          base_stat: data.stats[5].base_stat,
          effort: data.stats[5].effort,
        },
      },
      abilities: data.abilities,
      moves: data.moves,
      sprites: data.sprites,
    };
    return transformedData;
  }

  returnPage(): void {
    this.router.navigateByUrl('Pokedex/National');
  }
}
