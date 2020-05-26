import { Component, Input } from '@angular/core';
import { Transfer } from 'src/app/services/data';

@Component({
  selector: 'app-history-item',
  template: `<div class="history-item">
    <div class="history-item__name">
      <img width="40px" height="40px" [src]="transfer.merchantLogo"/>
    </div>
    <div class="history-item__amount">
      <span>{{transfer.merchant}}</span>
      <span>-$ {{transfer.amount}}</span>
    <div>
  </div>`,
  styleUrls: ['./history-item.component.sass']
})
export class HistoryItemComponent {
  @Input() public transfer: Transfer;
}
