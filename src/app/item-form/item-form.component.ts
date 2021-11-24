import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { LijstService } from '../lijst.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  itemId: number = 0;
  listId: number = 0;


  item: Item = { id: 0,title: "",listId: 0,statusId: 0,datum: "",volgorde: 0}
  items: Item[] = [];

  isSubmitted: boolean = false;
  errorMessage: string = "";

  item$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  constructor(private router: Router, private itemservice: ItemService, private lijstservice: LijstService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.itemId = this.router.getCurrentNavigation()?.extras.state?.Id;
    this.listId = this.router.getCurrentNavigation()?.extras.state?.listId;

    if (this.itemId != null && this.itemId > 0) {
      this.item$ = this.itemservice.getItemById(this.itemId).subscribe(result => this.item = result);
    }

    if (this.listId != null) {
      this.getItems();
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.item.statusId = 3;
      this.item.volgorde = this.items.length + 1
      this.item.listId = this.listId;
      this.postItem$ = this.itemservice.postItem(this.item).subscribe(result => {
        this.router.navigateByUrl("items/"+this.item.listId);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putItem$ = this.itemservice.putItem(this.itemId, this.item).subscribe(result => {
        this.router.navigateByUrl("items/"+this.item.listId);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }

  getItems() {
    this.itemservice.getItemsByListId(this.listId).subscribe(result => this.items = result);
  }

}
