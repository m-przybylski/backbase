import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transfer } from './data';

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
    return this.httpClient.get<Data<Transfer>>(`${this.basePath}/transactions.json`).pipe(map(data => data.data));
  }
}
