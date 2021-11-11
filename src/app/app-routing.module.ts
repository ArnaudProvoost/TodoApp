import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemComponent } from './item/item.component';
import { LijstFormComponent } from './lijst-form/lijst-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lijst/form', component: LijstFormComponent },
  { path: 'items/:lijstid', component: ItemComponent },
  { path: 'item/form', component: ItemFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
