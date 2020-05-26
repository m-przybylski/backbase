import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TransactionsService } from 'src/app/services/transactions.service';
import { TransactionType } from 'src/app/services/data';
import yoda from './yoda';

@Component({
  selector: 'app-transaction',
  template: `<header class="transaction-header">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path
          d="M12 4V2.21c0-.45-.54-.67-.85-.35l-2.8 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.86.09.86-.36V6c3.31 0 6 2.69 6 6 0 .79-.15 1.56-.44 2.25-.15.36-.04.77.23 1.04.51.51 1.37.33 1.64-.34.37-.91.57-1.91.57-2.95 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-.79.15-1.56.44-2.25.15-.36.04-.77-.23-1.04-.51-.51-1.37-.33-1.64.34C4.2 9.96 4 10.96 4 12c0 4.42 3.58 8 8 8v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V18z"
        />
      </svg>
      <h3>Make a Transfer</h3>
    </header>
    <div class="transaction-body" [formGroup]="form">
      <div class="form-field">
        <label>From Account</label>
        <input formControlName="from" placeholder="" type="text" />
      </div>
      <div class="form-field">
        <label>to account</label>
        <input formControlName="to" type="text" />
        <div class="error" *ngIf="form.controls.to.touched && form.controls.to.errors?.required">
          Field is required!
        </div>
      </div>
      <div class="form-field">
        <label>Amount</label>
        <span>$ <input formControlName="amount" type="number" /></span>
        <div
          class="error"
          *ngIf="form.controls.amount.touched && (form.controls.amount.errors?.min || form.controls.amount.errors?.max)"
        >
          Invalid amount. Please specify amount between 0 and 500
        </div>
        <div class="error" *ngIf="form.controls.amount.touched && form.controls.amount.errors?.required">
          Field is required!
        </div>
      </div>
      <div class="button-row">
        <button [disabled]="form.controls.amount.errors || form.controls.to.errors" (click)="makeTransfer()">Submit</button>
      </div>
    </div> `,
  styleUrls: ['./transaction.component.sass'],
})
export class TransactionComponent implements OnInit {
  public form: FormGroup;
  constructor(private readonly transactionsService: TransactionsService) {
    this.form = new FormGroup({
      from: new FormControl({ value: 'Checking(4240) - $5763.43', disabled: true }, [Validators.required]),
      to: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(500)]),
    });
  }

  public ngOnInit(): void {}

  public makeTransfer(): void {
    const amount = Number.parseFloat(Number.parseFloat(this.form.value.amount).toFixed(2));
    this.transactionsService.addTransfer({
      merchant: this.form.value.to,
      merchantLogo: yoda,
      categoryCode: '#12a580',
      amount,
      transactionDate: new Date(),
      transactionType: TransactionType.ONLINE_TRANSFER
    });
    this.form.setValue({
      from: 'Checking(4240) - $5763.43',
      to: '',
      amount: '',
    });
    this.form.markAsUntouched();
  }
}
