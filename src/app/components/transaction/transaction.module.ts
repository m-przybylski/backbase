import { NgModule } from '@angular/core';
import { TransactionComponent } from './transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [TransactionComponent],
  exports: [TransactionComponent],
})
export class TransactionModule {}
