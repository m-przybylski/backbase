import { TransactionsService } from './transactions.service';
import { TestBed, inject } from '@angular/core/testing';
import { MessageService } from '../components/message/message.service';
import { DataService } from './data.service';
import { of } from 'rxjs';

const transactions = [
  {
    merchant: 'transaction 1',
    amount: '80.03'
  },
  {
    merchant: 'transaction 2',
    amount: '80.03'
  },
  {
    merchant: 'transaction 3',
    amount: '80.03'
  },
  {
    merchant: 'transaction 4',
    amount: '80.03'
  }
];

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        {
          provide: DataService,
          useValue: {
            getData: jasmine
              .createSpy()
              .and.returnValue(of(transactions)),
          },
        },
        { provide: MessageService, useValues: { showSuccess: jasmine.createSpy(), showError: jasmine.createSpy() } },
      ],
    });
    transactionsService = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(transactionsService).toBeTruthy();
  });

  it('should get transactions from backend', inject([DataService], (dataService: DataService) => {
    const callback = jasmine.createSpy();
    transactionsService.transactions$.subscribe(callback);
    expect(callback).toHaveBeenCalledWith(transactions);
    expect(dataService.getData).toHaveBeenCalled();
  }));
});
