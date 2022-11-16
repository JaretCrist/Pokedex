import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';

@Component({
  selector: 'app-move-dialog',
  templateUrl: './move-dialog.component.html',
  styleUrls: ['./move-dialog.component.scss'],
})
export class MoveDialogComponent implements OnInit {
  moveData: any;

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<MoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { moveUrl: string }
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get(this.data.moveUrl)
      .pipe(
        tap((res) => {
          this.moveData = res;
          console.log(this.moveData);
        })
      )
      .subscribe();
  }
}
