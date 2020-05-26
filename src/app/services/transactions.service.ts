import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MessageService } from '../components/message/message.service';
import { Transfer } from './data';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  public transactions$: Observable<Transfer[]>;
  private transactions: BehaviorSubject<Transfer[]>;
  private searchBy$: BehaviorSubject<string>;
  private sortBy$: BehaviorSubject<keyof Transfer | null>;

  constructor(private readonly dataService: DataService, private readonly messageService: MessageService) {
    this.transactions = new BehaviorSubject([]);
    this.searchBy$ = new BehaviorSubject('');
    this.sortBy$ = new BehaviorSubject(null);
    this.dataService.getData().subscribe(transactions => {
      this.transactions.next(transactions);
    });
    this.transactions$ = combineLatest([this.transactions, this.searchBy$, this.sortBy$]).pipe(
      map(([transactions, searchBy, sortBy]) => {
        const filtered = transactions.filter(transaction =>
          transaction.merchant.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()),
        );
        if (sortBy === null) {
          return filtered;
        }
        return filtered.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          return 0;
        });
      }),
    );
  }

  public addTransfer(transfer: Transfer): void {
    if (transfer.amount === 100) {
      this.messageService.showError('Not able to make a transfer!');
      return;
    }
    const transactions = this.transactions.value.concat(transfer);
    this.transactions.next(transactions);
    this.messageService.showSuccess('Transfer completed!');
  }

  public searchBy(text: string): void {
    this.searchBy$.next(text);
  }

  public sortBy(key: keyof Transfer) {
    this.sortBy$.next(key);
  }
}
