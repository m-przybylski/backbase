export enum MessageType {
  SUCCESS = 0,
  ERROR
}

export type MessageTypes = MessageType.SUCCESS | MessageType.ERROR;

export interface Message {
  messageType: MessageType;
  messageText: string;
}
