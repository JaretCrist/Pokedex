import { Injectable } from '@angular/core';

export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_female_shiny: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_female_shiny: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_female_shiny: string | null;
    };
    officalArt: string | null;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: {
    slot1: string | null;
    slot2: string | null;
  };
  stats: {
    hp: {
      base_stat: number;
      effort: number;
    };
    atk: {
      base_stat: number;
      effort: number;
    };
    def: {
      base_stat: number;
      effort: number;
    };
    spAtk: {
      base_stat: number;
      effort: number;
    };
    spDef: {
      base_stat: number;
      effort: number;
    };
    spd: {
      base_stat: number;
      effort: number;
    };
  };
  abilities: [
    {
      ability: {
        name: string;
        url: string;
      };
      slot: number;
      isHidden: boolean;
    }
  ];
  moves: [
    {
      move: {
        name: string;
        url: string;
      };
      version_group: [
        {
          levelLearned: number;
          learnMethod: string;
          gameVersion: string;
        }
      ];
    }
  ];
  sprites: Sprites;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonCache {
  pokemonCache: Pokemon[] = [
    {
      id: 0,
      name: 'MISSINGNO',
      base_experience: 0,
      height: 0,
      weight: 0,
      types: {
        slot1: null,
        slot2: null,
      },
      stats: {
        hp: {
          base_stat: 0,
          effort: 0,
        },
        atk: {
          base_stat: 0,
          effort: 0,
        },
        def: {
          base_stat: 0,
          effort: 0,
        },
        spAtk: {
          base_stat: 0,
          effort: 0,
        },
        spDef: {
          base_stat: 0,
          effort: 0,
        },
        spd: {
          base_stat: 0,
          effort: 0,
        },
      },
      abilities: [
        {
          ability: {
            name: 'MISSINGNO',
            url: 'DNE',
          },
          slot: 0,
          isHidden: false,
        },
      ],
      moves: [
        {
          move: {
            name: 'DNE',
            url: 'DNE',
          },
          version_group: [
            {
              levelLearned: 0,
              learnMethod: 'DNE',
              gameVersion: 'DNE',
            },
          ],
        },
      ],
      sprites: {
        back_default: null,
        back_female: null,
        back_shiny: null,
        back_female_shiny: null,
        front_default: null,
        front_female: null,
        front_shiny: null,
        front_female_shiny: null,
        other: {
          dream_world: {
            front_default: null,
            front_female: null,
          },
          home: {
            front_default: null,
            front_female: null,
            front_shiny: null,
            front_female_shiny: null,
          },
          officalArt: null,
        },
      },
    },
  ];
}
