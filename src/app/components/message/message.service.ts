import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message, MessageType } from './message';

@Injectable({providedIn: 'root'})
export class MessageService {
  private messages: Subject<Message>;
  public messages$: Observable<Message>;
  constructor(){
    this.messages = new Subject();
    this.messages$ = this.messages.asObservable();
  }

  public showSuccess(message: string): void {
    this.messages.next({
      messageType: MessageType.SUCCESS,
      messageText: message
    });
  }

  public showError(message: string): void {
    this.messages.next({
      messageType: MessageType.ERROR,
      messageText: message
    });
  }
}
