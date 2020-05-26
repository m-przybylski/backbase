import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Observable, Subject } from 'rxjs';
import { Transfer } from 'src/app/services/data';
import { FormControl } from '@angular/forms';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  template: ` <header class="history-header">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path class="icon__path"
          d="M13 16h-2c-.55 0-1-.45-1-1H3.01v4c0 1.1.9 2 2 2H19c1.1 0 2-.9 2-2v-4h-7c0 .55-.45 1-1 1zm7-9h-4c0-2.21-1.79-4-4-4S8 4.79 8 7H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-1c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v1h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 7c0-1.1.9-2 2-2s2 .9 2 2H9.99 10z"
        />
      </svg>
      <h3>Recent transactions</h3>
    </header>
    <div class="history-data">
      <div class="filters">
        <div class="form-field filters__search">
          <input [formControl]="searchFormControl" type="text" placeholder="Search by typing..." />
        </div>
        <div class="filters__sort">
          <span>Sort by</span>
          <div class="sort-button-group">
            <button (click)="sortBy('merchant')">Beneficiary</button>
            <button (click)="sortBy('amount')">Amount</button>
          </div>
        </div>
      </div>
      <div class="history-list">
        <div *ngFor="let transaction of transactions$ | async">
          <app-history-item [transfer]="transaction"></app-history-item>
        </div>
      </div>
    </div>
    `,
  styleUrls: ['./history.component.sass'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  public transactions$: Observable<Transfer[]>;
  public searchFormControl: FormControl;
  private destroyed$: Subject<void>;
  constructor(private readonly transactions: TransactionsService){
    this.transactions$ = transactions.transactions$;
    this.searchFormControl = new FormControl('');
    this.destroyed$ = new Subject();
  }

  public ngOnInit(): void {
    this.searchFormControl.valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(200),
    ).subscribe(searchText => {
      this.transactions.searchBy(searchText);
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public sortBy(key: keyof Transfer): void {
    this.transactions.sortBy(key);
  }
}
