import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lijst } from '../lijst';
import { LijstService } from '../lijst.service';

@Component({
  selector: 'app-lijst-form',
  templateUrl: './lijst-form.component.html',
  styleUrls: ['./lijst-form.component.scss']
})
export class LijstFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  lijstId: number = 0;

  lijst: Lijst = {id: 0,title: "", lijstbackgroundcolor: "",items: []};

  isSubmitted: boolean = false;
  errorMessage: string = "";

  lijst$: Subscription = new Subscription();
  postLijst$: Subscription = new Subscription();
  putLijst$: Subscription = new Subscription();

  constructor(private router: Router, private lijstservice: LijstService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.lijstId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.lijstId != null && this.lijstId > 0) {
      this.lijst$ = this.lijstservice.getLijstById(this.lijstId).subscribe(result => this.lijst = result);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
    this.lijst$.unsubscribe();
    this.postLijst$.unsubscribe();
    this.putLijst$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postLijst$ = this.lijstservice.postLijsten(this.lijst).subscribe(result => {
        this.router.navigateByUrl("/");
      }, error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putLijst$ = this.lijstservice.putLijsten(this.lijstId, this.lijst).subscribe(result => {
        this.router.navigateByUrl("/");
      },error => {
        this.errorMessage = error.message;
      });
    }
  }

}
