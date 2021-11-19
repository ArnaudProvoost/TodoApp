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
  putItem$: Subscription = new Subscription();
  lijstenId: any;
  errorMessage: string = '';

  item_done: Item = { id: 0,title: "",listId: 0,statusId: 0}
  item_not_done: Item = { id: 0,title: "",listId: 0,statusId: 0}

  constructor(private itemservice: ItemService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.lijstenId = this.route.snapshot.paramMap.get('lijstid');
    if (this.lijstenId != null) {
      this.getItems();
    }
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.deleteItem$.unsubscribe();
    this.putItem$.unsubscribe();
  }

  notdone(id: number){
    this.item_not_done.statusId = 3;
    this.putItem$ = this.itemservice.putItem(id, this.item_done).subscribe(result => {
      this.item_done = result
    },
    error => {
      this.item_not_done.id = id;
      this.item_not_done.listId = 1;
      this.item_not_done.statusId = 1;
      this.item_not_done.title = "GetitemByid failed";
    });
  }

  done(id: number){
    this.item_done$ = this.itemservice.getItemById(id).subscribe(result => this.item_not_done = result);
    this.item_done.statusId = 1;
    this.putItem$ = this.itemservice.putItem(id, this.item_not_done).subscribe(result => {
      this.router.navigateByUrl("items/"+this.item_not_done.listId);
    },
    error => {
      this.errorMessage = error.message;
    });
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
