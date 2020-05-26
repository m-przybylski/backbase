import { Component, Input } from '@angular/core';
import { Transfer } from 'src/app/services/data';

@Component({
  selector: 'app-history-item',
  template: `<div class="history-item">
    <div class="history-category" [ngStyle]="{'border': borderStyle()}"></div>
    <div class="history-item__details">
      <div class="segment">
        <span class="date">{{ transfer.transactionDate | date:'MMM d' }}</span>
        <img class="image" width="40px" height="40px" [src]="transfer.merchantLogo"/>
      </div>
      <div class="segment-right">
        <h3 class="name">{{ transfer.merchant }}</h3>
        <span class="type">{{ transfer.transactionType }}</span>
        <h3 class="amount">-$ {{ transfer.amount }}</h3>
      </div>
    </div>
    <div class="history-item__details--desktop">
      <div class="segment">
        <span class="date">{{ transfer.transactionDate | date:'MMM d' }}</span>
        <div class="image-wrapper">
          <img class="image" width="40px" height="40px" [src]="transfer.merchantLogo"/>
        </div>
        <div class="segment--desktop">
          <h3 class="name">{{ transfer.merchant }}</h3>
          <span class="type">{{ transfer.transactionType }}</span>
        </div>
      </div>
      <h3 class="amount">-$ {{ transfer.amount }}</h3>
    </div>
  </div>`,
  styleUrls: ['./history-item.component.sass']
})
export class HistoryItemComponent {
  @Input() public transfer: Transfer;
  public borderStyle(): string {
    return `2px solid ${this.transfer.categoryCode}`;
  }
}
