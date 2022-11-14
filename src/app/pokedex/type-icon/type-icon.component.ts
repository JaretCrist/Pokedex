import { Component, Input, OnInit } from '@angular/core';
import { PokemonCache } from '../pokemon.service';

@Component({
  selector: 'app-type-icon',
  templateUrl: './type-icon.component.html',
  styleUrls: ['./type-icon.component.scss'],
})
export class TypeIconComponent implements OnInit {
  @Input() number = 0;
  shortenedType1: string | null = null;
  shortenedType2: string | null = null;

  constructor(private pokemonCache: PokemonCache) {}

  ngOnInit(): void {
    if (this.number) {
      this.shortenedType1 = this.initialization(1);
      this.shortenedType2 = this.initialization(2);
    }
  }

  initialization(slot: number): string | null {
    let temp: string | null = '';

    if (this.pokemonCache.pokemonCache[this.number]) {
      if (slot == 1) {
        temp = this.pokemonCache.pokemonCache[this.number].types.slot1;
      } else {
        temp = this.pokemonCache.pokemonCache[this.number].types.slot2;
      }
    } else {
      temp = slot == 2 ? null : '???';
    }

    switch (temp) {
      case 'electric':
        temp = 'electr';
        break;
      case 'fighting':
        temp = 'fight';
        break;
      case 'psychic':
        temp = 'psychc';
        break;
      case '???':
        temp = 'unknown';
        break;
    }

    return temp;
  }
}
