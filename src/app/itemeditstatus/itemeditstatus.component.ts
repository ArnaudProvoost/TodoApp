import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../Item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-itemeditstatus',
  templateUrl: './itemeditstatus.component.html',
  styleUrls: ['./itemeditstatus.component.scss']
})
export class ItemeditstatusComponent implements OnInit, OnDestroy {
  isDone: boolean = false;
  isNotDone: boolean = false;
  isHigher: boolean = false;
  isLower: boolean = false;
  itemId: number = 0;
  listId: number = 0;
  item_2Id: number = 0;
  item_volgorde: number = 0;

  item: Item = {id: 0,title: "",listId: 0,statusId: 0,datum: "",volgorde: 0}
  item_2: Item = {id: 0,title: "",listId: 0,statusId: 0,datum: "",volgorde: 0}

  errorMessage: string = "";

  item$: Subscription = new Subscription();
  item_2$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  postItem_2$: Subscription = new Subscription();


  constructor(private router: Router, private itemservice: ItemService) {
    this.isDone = this.router.getCurrentNavigation()?.extras.state?.mode === 'done';
    this.isNotDone = this.router.getCurrentNavigation()?.extras.state?.mode === 'notdone';
    this.isHigher = this.router.getCurrentNavigation()?.extras.state?.mode === 'higher';
    this.isLower = this.router.getCurrentNavigation()?.extras.state?.mode === 'lower';
    this.itemId = this.router.getCurrentNavigation()?.extras.state?.Id;
    this.item_volgorde = this.router.getCurrentNavigation()?.extras.state?.volgorde;
    this.listId = this.router.getCurrentNavigation()?.extras.state?.listId;


    this.item$ = this.itemservice.getItemById(this.itemId).subscribe(result => this.item = result);

    if (this.isHigher) {
      this.item_2$ = this.itemservice.GetItemByVolgorde(this.item_volgorde-1,this.listId).subscribe(result => this.item_2 = result[0])
    }
    else if (this.isLower) {
      this.item_2$ = this.itemservice.GetItemByVolgorde(this.item_volgorde+1,this.listId).subscribe(result => this.item_2 = result[0])
    }
  }

  ngOnInit(): void {
    this.submit()
  }

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.item_2$.unsubscribe();
    this.postItem_2$.unsubscribe();
  }

  async submit() {
    if (this.item.id == 0){
      await this.sleep(150);
    }
    if (this.isLower || this.isHigher) {
      if (this.item_2.id == 0) {
        await this.sleep(150);
      }
    }
    if (this.isDone) {
      this.item.statusId = 1;
      this.postItem$ = this.itemservice.putItem(this.itemId,this.item).subscribe(result => {
        this.router.navigateByUrl("items/"+this.item.listId);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isNotDone) {
      this.item.statusId = 3;
      this.postItem$ = this.itemservice.putItem(this.itemId,this.item).subscribe(result => {
        this.router.navigateByUrl("items/"+this.item.listId);
      },
      error => {
        this.errorMessage = error.message;
      });
    }

    if (this.isLower) {
      this.item.volgorde = this.item.volgorde+1;
      this.item_2.volgorde = this.item_volgorde;
      this.item_2Id = this.item_2.id;
      this.postItem$ = this.itemservice.putItem(this.itemId,this.item).subscribe();
      this.postItem_2$ = this.itemservice.putItem(this.item_2Id,this.item_2).subscribe(result => {
        this.router.navigateByUrl("items/"+this.item.listId);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isHigher) {
      this.item.volgorde = this.item_volgorde-1;
      this.item_2.volgorde = this.item_volgorde;
      this.item_2Id = this.item_2.id;
      this.postItem$ = this.itemservice.putItem(this.itemId,this.item).subscribe();
      this.postItem_2$ = this.itemservice.putItem(this.item_2Id,this.item_2).subscribe(result => {
        this.router.navigateByUrl("items/"+this.item.listId);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
