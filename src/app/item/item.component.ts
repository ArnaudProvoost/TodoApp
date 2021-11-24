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
  }

  add() {
    this.router.navigate(['item/form'], {state: {listId: this.lijstenId,mode: 'add'}});
  }

  done(id: number) {
    this.router.navigate(['item/status'], {state: {Id: id,mode: 'done'}})
  }

  notdone(id: number) {
    this.router.navigate(['item/status'], {state: {Id: id,mode: 'notdone'}})
  }

  edit(id: number) {
    this.router.navigate(['item/form'], {state: {Id: id, mode: 'edit'}});
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

  sortTable(n: number) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("itemtable") as HTMLTableElement;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
