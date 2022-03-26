import { IStoreState, ISubscriber } from "@/@types";
import axios from "axios";
console.log(process.env);
const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  timeout: 1000,
});

export function getSubscribers(
  query: unknown
): Promise<IStoreState["subscribers"]> {
  return instance.get("/subscribers", {
    params: query || {},
  });
}
export function getOneSubscriber(subscriberId: string): Promise<ISubscriber> {
  return instance.get(`/subscribers/${subscriberId}`);
}
export function updateOneSubscriber(
  subscriberId: string,
  data: IStoreState["editing"]
): Promise<ISubscriber> {
  return instance.put(`/subscribers/${subscriberId}`, data);
}
export function deleteOneSubscriber(
  subscriberId: string
): Promise<ISubscriber> {
  return instance.put(`/subscribers/${subscriberId}`);
}
export function createOneSubscriber(
  data: IStoreState["editing"]
): Promise<ISubscriber> {
  return instance.post(`/subscribers`, data);
}
