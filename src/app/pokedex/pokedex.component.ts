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

  allData: {
    count: number;
    namesList: string[];
  } = { count: 0, namesList: [] };

  ngOnInit(): void {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .pipe(
        tap((results) => {
          this.apiMap(results);
          console.log(this.allData);
        })
      )
      .subscribe();
  }

  apiMap(data: any): void {
    this.allData = {
      count: data.count,
      namesList: data.results.map(
        (element: { name: string; url: string }) => element.name
      ),
    };
  }

  navigate(dexNum: number): void {
    this.router.navigateByUrl(`/Pokedex/${dexNum}`);
  }
}
