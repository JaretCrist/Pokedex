import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonComponent } from './pokedex/pokemon/pokemon.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Pokedex/National',
    pathMatch: 'full',
  },
  {
    path: 'Pokedex',
    component: BackgroundImageComponent,
    children: [
      {
        path: 'National',
        component: PokedexComponent,
      },
      {
        path: ':pokemon',
        component: PokemonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
