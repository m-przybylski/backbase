import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

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
    response.flush({ data: ['one', 'two', 'three'] });
    expect(responseCb).toHaveBeenCalledWith(['one', 'two', 'three']);
  }));
});
