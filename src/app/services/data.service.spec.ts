import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

const rawTransactions = [
  {
    amount: '82.02',
    categoryCode: '#12a580',
    merchant: 'The Tea Lounge',
    merchantLogo: '',
    transactionDate: 1476933842000,
    transactionType: 'Card Payment',
  },
  {
    amount: '84.64',
    categoryCode: '#d51271',
    merchant: 'Texaco',
    merchantLogo: '',
    transactionDate: 1476926642000,
    transactionType: 'Card Payment',
  },
];

const transactions =  [
  {
    amount: 82.02,
    categoryCode: '#12a580',
    merchant: 'The Tea Lounge',
    merchantLogo: '',
    transactionDate: new Date('2016-10-20T05:24:02'),
    transactionType: 'Card Payment',
  },
  {
    amount: 84.64,
    categoryCode: '#d51271',
    merchant: 'Texaco',
    merchantLogo: '',
    transactionDate: new Date('2016-10-20T03:24:02'),
    transactionType: 'Card Payment',
  },
];

describe('DataService', () => {
  let dataService: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
  });

  beforeEach(() => {
    dataService = TestBed.inject(DataService);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should fetch transactions.json', inject([HttpTestingController], (backend: HttpTestingController) => {
    const responseCb = jasmine.createSpy();
    dataService.getData().subscribe(responseCb);
    const response = backend.expectOne({
      url: 'assets/transactions.json',
      method: 'GET',
    });
    response.flush({ data: rawTransactions });
    expect(responseCb).toHaveBeenCalledWith(transactions);
  }));
});
