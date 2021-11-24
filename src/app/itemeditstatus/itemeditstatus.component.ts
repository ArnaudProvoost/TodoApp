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

  item: Item = {id: 0,title: "",listId: 0,statusId: 0,datum: "",volgorde: 0}

  errorMessage: string = "";

  item$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  constructor(private router: Router, private itemservice: ItemService) {
    this.isDone = this.router.getCurrentNavigation()?.extras.state?.mode === 'done';
    this.isNotDone = this.router.getCurrentNavigation()?.extras.state?.mode === 'notdone';
    this.isHigher = this.router.getCurrentNavigation()?.extras.state?.mode === 'higher';
    this.isLower = this.router.getCurrentNavigation()?.extras.state?.mode === 'lower';
    this.itemId = this.router.getCurrentNavigation()?.extras.state?.Id;

    this.item$ = this.itemservice.getItemById(this.itemId).subscribe(result => this.item = result);
  }

  ngOnInit(): void {
    this.submit()
  }

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
  }

  async submit() {
    if (this.item.id == 0) {
      await this.sleep(150);
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

    if (this.isHigher) {
      // volgorde + 1 voor this.item
      // volgorde -1 voor this.item-1
    }
    if (this.isLower) {
      // volorgde -1 voor this.item
      // volgorde +1 voor this.item +1
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
