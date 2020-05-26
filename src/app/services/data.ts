export interface Transfer {
  amount: number;
  categoryCode: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: Date;
  transactionType: TransactionType;
}

export interface TransferRaw {
  amount: string;
  categoryCode: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: number;
  transactionType: TransactionType;
}

export enum TransactionType {
  ONLINE_TRANSFER = 'Online Transfer',
  CARD_PAYMENT = 'Card Payment',
  TRANSACTION = 'Transaction'
}
