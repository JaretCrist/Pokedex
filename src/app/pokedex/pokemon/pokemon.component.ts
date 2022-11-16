import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, mergeMap, of, tap } from 'rxjs';
import { Pokemon, PokemonCache, Sprites } from '../pokemon.service';
import { CURRENT_POKEMON_TOTAL } from '../pokedex.component';
import { MatDialog } from '@angular/material/dialog';
import { MoveDialogComponent } from './move-dialog/move-dialog.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private pokemonCache: PokemonCache,
    private dialog: MatDialog
  ) {}

  allData: Pokemon | null = null;
  currentPokemon: string | null = null;
  picturesList: string[] = [];
  currentPicIndex = 2;
  pageView: 'stats' | 'abilities' | 'moves' = 'stats';
  abilityEffects: string[] = [];

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
            this.picturesList = [];
            this.pictureInitialize(this.allData.sprites);
            if (this.allData.sprites.back_female) {
              this.currentPicIndex = 4;
            }
            if (this.currentPokemon) {
              const tempNum = Number(this.currentPokemon);
              if (!isNaN(tempNum) && !this.pokemonCache.pokemonCache[tempNum]) {
                this.pokemonCache.pokemonCache[tempNum] = this.allData;
              }
            }
          } else {
            throw new Error('Pokemon not found, no data returned');
          }
        }),
        mergeMap(() => {
          this.abilityEffects = [];
          if (this.allData && this.allData.abilities[0]) {
            return this.httpClient.get(this.allData.abilities[0].ability.url);
          }
          return of(true);
        }),
        tap((results: any) => {
          if (typeof results !== 'boolean') {
            const temp =
              results.effect_entries[0].language.name === 'en' ? 0 : 1;
            this.abilityEffects.push(results.effect_entries[temp].effect);
          }
        }),
        mergeMap(() => {
          if (this.allData && this.allData.abilities[1]) {
            return this.httpClient.get(this.allData.abilities[1].ability.url);
          }
          return of(true);
        }),
        tap((results: any) => {
          if (typeof results !== 'boolean') {
            const temp =
              results.effect_entries[0].language.name === 'en' ? 0 : 1;
            this.abilityEffects.push(results.effect_entries[temp].effect);
          }
        }),
        mergeMap(() => {
          if (this.allData && this.allData.abilities[2]) {
            return this.httpClient.get(this.allData.abilities[2].ability.url);
          }
          return of(true);
        }),
        tap((results: any) => {
          if (typeof results !== 'boolean') {
            const temp =
              results.effect_entries[0].language.name === 'en' ? 0 : 1;
            this.abilityEffects.push(results.effect_entries[temp].effect);
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
      types: {
        slot1: data.types[0].type.name,
        slot2: data.types[1]?.type ? data.types[1].type.name : null,
      },
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

  pictureInitialize(sprites: Sprites): void {
    for (const value of Object.values(sprites)) {
      if (value) {
        if (typeof value === 'string') {
          this.picturesList.push(value);
        } else {
          this.pictureInitialize(value);
        }
      }
    }
  }

  galleryRotate(direction: 'left' | 'right') {
    let tempIndex = this.currentPicIndex;
    if (direction === 'left') {
      tempIndex--;
    } else {
      tempIndex++;
    }

    if (tempIndex < 0) {
      this.currentPicIndex = this.picturesList.length - 1;
    } else if (tempIndex >= this.picturesList.length) {
      this.currentPicIndex = 0;
    } else {
      this.currentPicIndex = tempIndex;
    }
  }

  returnPage(): void {
    this.router.navigateByUrl('Pokedex/National');
  }
  navigate(dexNum: number): void {
    if (0 < dexNum && dexNum <= CURRENT_POKEMON_TOTAL) {
      this.router.navigateByUrl(`/Pokedex/${dexNum}`);
    }
  }

  openMoveDialog(url: string): void {
    console.log(url);
    const dialogRef = this.dialog.open(MoveDialogComponent, {
      width: '40%',
      data: { moveUrl: url },
    });

    dialogRef.afterClosed().subscribe();
  }
}
