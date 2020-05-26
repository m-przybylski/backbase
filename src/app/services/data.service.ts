import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransferRaw, Transfer } from './data';

interface Data<T> {
  data: T[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private basePath: string;
  constructor(private readonly httpClient: HttpClient) {
    this.basePath = 'assets';
  }
  public getData(): Observable<Transfer[]> {
    return this.httpClient.get<Data<TransferRaw>>(`${this.basePath}/transactions.json`).pipe(
      map(data => data.data),
      map(transactions =>
        transactions.map(transaction => ({
          amount: Number.parseFloat(transaction.amount),
          merchant: transaction.merchant,
          merchantLogo: transaction.merchantLogo,
          categoryCode: transaction.categoryCode,
          transactionDate: new Date(transaction.transactionDate),
          transactionType: transaction.transactionType,
        })),
      ),
    );
  }
}
