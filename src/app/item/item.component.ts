import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();
  lijstenId: any;
  errorMessage: string = '';

  constructor(private itemservice: ItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.lijstenId = this.route.snapshot.paramMap.get('lijstid');
    if (this.lijstenId != null) {
      this.getItems();
    }
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.deleteItem$.unsubscribe();
  }

  add() {
    this.router.navigate(['item/form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    this.router.navigate(['item/form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteItem$ = this.itemservice.deleteItem(id).subscribe(result => {
      this.getItems();
    },
    error =>
    {
      this.errorMessage = error.message;
    });
  }

  getItems() {
    this.itemservice.getItemsByListId(this.lijstenId).subscribe(result => this.items = result);
  }
}
