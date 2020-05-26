import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, Subject, merge, timer } from 'rxjs';
import { Message, MessageType } from './message';
import { tap, take } from 'rxjs/operators';

const HIDE_MESSAGE_TIMEOUT = 5000;

@Component({
  selector: 'app-message',
  template: `<div class="message" *ngIf="messages$ | async as message" [ngClass]="getMessageClass(message.messageType)">
      <div class="message__element">
        {{ message.messageText }}
      </div>
    </div>`,
  styleUrls: ['message.component.sass'],
})
export class MessageComponent {
  public messages$: Observable<Message | null>;
  private hideMessage$: Subject<null>;
  constructor(private readonly messageService: MessageService) {
    this.hideMessage$ = new Subject();
    this.messages$ = merge(
      this.messageService.messages$.pipe(
        tap(() =>
          timer(HIDE_MESSAGE_TIMEOUT)
            .pipe(take(1))
            .subscribe(() => {
              this.hideMessage$.next(null);
            }),
        ),
      ),
      this.hideMessage$,
    );
  }

  public getMessageClass(messageType: MessageType): string {
    return messageType === MessageType.SUCCESS ? 'message--success' : 'message--error';
  }
}
