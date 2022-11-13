export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: {
    slot1: string;
    slot2: string;
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
  sprites: {
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
  };
}

export let pokemonCache: Pokemon[];
