import { NgModule } from '@angular/core';
import { HistoryComponent } from './history.component';
import { CommonModule } from '@angular/common';
import { HistoryItemComponent } from './history-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [HistoryComponent, HistoryItemComponent],
  exports: [HistoryComponent],
})
export class HistoryModule {}
