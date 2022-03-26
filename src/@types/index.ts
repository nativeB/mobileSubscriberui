export interface IStoreState {
  editing: Partial<ISubscriber>;
  subscribers: ISubscriber[];
  totalRecords: number;
  statistics: {
    totalRecords: number;
    prepaidRecords: number;
    postpaidRecords: number;
  }
}

export interface ISubscriber {
  _id: string,
  id: number;
  msisdn: string;
  customerIdOwner: number;
  customerIdUser: number;
  serviceType: string;
  serviceStartDate: Date;
}
