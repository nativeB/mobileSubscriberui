import { IStoreState, ISubscriber } from "@/@types";
import { get } from "lodash-es";

export function setSubscribers(
  state: IStoreState,
  data: IStoreState["subscribers"]
): void {
  state.subscribers = data;
}
export function setEditing(
  state: IStoreState,
  data: IStoreState["editing"]
): void {
  state.editing = data;
}
export function setEditingItem(
  state: IStoreState,
  data: { key: keyof ISubscriber; value: any }
): void {
  state.editing[data.key] = data.value;
}

export function setSubscriber(state: IStoreState, data: ISubscriber): void {
  const subscribers: ISubscriber[] = state.subscribers;
  const index = subscribers.findIndex(
    (subscriber) => subscriber._id === data._id
  );
  if (index > -1) {
    subscribers[index] = data;
  } else {
    subscribers.push(data);
  }
}
export function setTotalRecords(state: IStoreState, data: number): void {
  state.totalRecords = data;
}
export function setStatistics(state: IStoreState, data: any): void {
  const totalRecords = get(data, "x-total-subscribers");
  const prepaidRecords = get(data, "x-prepaid-subscribers");
  const postpaidRecords = get(data, "x-postpaid-subscribers");
  state.statistics = {
    totalRecords,
    postpaidRecords,
    prepaidRecords,
  };
}
