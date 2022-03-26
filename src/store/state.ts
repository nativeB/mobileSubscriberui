import { IStoreState } from "@/@types";

const state: IStoreState = {
  editing: {},
  subscribers: [],
  totalRecords: 0,
  statistics: {
      totalRecords: 0,
      prepaidRecords: 0,
      postpaidRecords: 0
  }
};

export default state;
