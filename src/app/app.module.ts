import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LijstComponent } from './lijst/lijst.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LijstFormComponent } from './lijst-form/lijst-form.component';
import { ItemComponent } from './item/item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemeditstatusComponent } from './itemeditstatus/itemeditstatus.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LijstComponent,
    LijstFormComponent,
    ItemComponent,
    ItemFormComponent,
    ItemeditstatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
