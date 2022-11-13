import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router) {}

  allData: any;
  lucario: any;

  ngOnInit(): void {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .pipe(
        tap((results) => {
          this.allData = results;
          console.log(this.allData);
        })
      )
      .subscribe();

    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon/448/')
      .pipe(
        tap((results) => {
          this.lucario = results;
          console.log(this.lucario);
        })
      )
      .subscribe();
  }

  navigate(dexNum: number): void {
    this.router.navigateByUrl(`/Pokedex/${dexNum}`);
  }
}
