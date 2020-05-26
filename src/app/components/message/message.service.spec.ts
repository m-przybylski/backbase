import { MessageService } from './message.service';
import { TestBed } from '@angular/core/testing';
import { MessageType } from './message';

describe('MessageService', () => {
  let messageService: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(messageService).toBeTruthy();
  });
  it('should emit message with type success after showSuccess', done => {
    messageService.messages$.subscribe(message => {
      expect(message).toEqual({
        messageType: MessageType.SUCCESS,
        messageText: 'fake success message',
      });
      done();
    });
    messageService.showSuccess('fake success message');
  });
  it('should emit message with type error after showError', done => {
    messageService.messages$.subscribe(message => {
      expect(message).toEqual({
        messageType: MessageType.ERROR,
        messageText: 'fake success message',
      });
      done();
    });
    messageService.showError('fake success message');
  });
});
