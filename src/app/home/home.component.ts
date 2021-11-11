import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lijst } from '../lijst';
import { LijstService } from '../lijst.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lijsten$: Observable<Lijst[]> = new Observable<Lijst[]>();

  constructor(private lijstService: LijstService) { }

  ngOnInit(): void {
    this.lijsten$ = this.lijstService.getLijsten();
  }

}
