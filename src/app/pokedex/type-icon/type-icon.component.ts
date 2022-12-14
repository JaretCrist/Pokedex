import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.service';

@Component({
  selector: 'app-type-icon',
  templateUrl: './type-icon.component.html',
  styleUrls: ['./type-icon.component.scss'],
})
export class TypeIconComponent implements OnChanges {
  @Input() number = 0;
  @Input() cached: Pokemon[] = [];
  @Input() bypass = false;

  shortenedType1: string | null = null;
  shortenedType2: string | null = null;

  ngOnChanges(): void {
    if (this.number && this.cached) {
      this.shortenedType1 = this.initialization(1);
      this.shortenedType2 = this.initialization(2);
    }
  }

  initialization(slot: number): string | null {
    let temp: string | null = '';

    if (this.cached[this.number]) {
      if (slot == 1) {
        temp = this.cached[this.number].types.slot1;
      } else {
        temp = this.cached[this.number].types.slot2;
      }
    } else {
      if (this.bypass) {
        temp =
          slot == 1 ? this.cached[0].types.slot1 : this.cached[0].types.slot2;
      } else {
        temp = slot == 2 ? null : '???';
      }
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
