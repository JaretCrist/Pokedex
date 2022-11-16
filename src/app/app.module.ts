import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonComponent } from './pokedex/pokemon/pokemon.component';
import { BackgroundImageComponent } from './background-image/background-image.component';
import { TypeIconComponent } from './pokedex/type-icon/type-icon.component';
import { MoveDialogComponent } from './pokedex/pokemon/move-dialog/move-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokemonComponent,
    BackgroundImageComponent,
    TypeIconComponent,
    MoveDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
