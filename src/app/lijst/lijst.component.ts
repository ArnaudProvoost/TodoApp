import { state } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';
import { Lijst } from '../lijst';
import { LijstService } from '../lijst.service';

@Component({
  selector: 'app-lijst',
  templateUrl: './lijst.component.html',
  styleUrls: ['./lijst.component.scss']
})
export class LijstComponent implements OnInit,OnDestroy {
  lijsten: Lijst[] = [];

  lijsten$: Subscription = new Subscription();
  deleteLijst$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private lijstservice: LijstService, private router: Router,itemservice: ItemService) { }

  ngOnInit(): void {
    this.getLijsten();
  }

  ngOnDestroy(): void {
    this.lijsten$.unsubscribe();
    this.deleteLijst$.unsubscribe();
  }

  add() {
    this.router.navigate(['lijst/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    this.router.navigate(['lijst/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteLijst$ = this.lijstservice.deleteLijsten(id).subscribe(result => {
      this.getLijsten()
    }, error => {
      this.errorMessage = error.message;
    });
  }

  getLijsten() {
    this.lijsten$ = this.lijstservice.getLijsten().subscribe(result => this.lijsten = result);
  }

  items(lijstid: number) {
    this.router.navigate(['/items',lijstid])
  }

}
