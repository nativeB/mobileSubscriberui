import { ISubscriber } from "@/@types";
import * as services from "@/services";
import { get } from "lodash-es";
export async function getSubscribers(
  context: any,
  { query }: any
): Promise<ISubscriber[]> {
  const response = await services.getSubscribers(query);
  const data = get(response, "data", {});
  const headers = get(response, "headers", {});
  if (data.success) {
    context.commit("setSubscribers", data.subscribers);
    context.commit("setTotalRecords", data.totalRecords);
    context.commit("setStatistics", headers);
  }
  return data;
}

export async function getSubscriber(
  context: any,
  { subscriberId }: any
): Promise<ISubscriber[]> {
  const response = await services.getOneSubscriber(subscriberId);
  const data = get(response, "data", {});
  if (data.success) {
    context.commit("setSubscriber", data.subscriber);
  }
  return data;
}
export async function updateSubscriber(
  context: any,
  { subscriberId, update }: any
): Promise<ISubscriber[]> {
  const response = await services.updateOneSubscriber(subscriberId, update);
  const data = get(response, "data", {});
  if (data.success) {
    context.commit("setSubscriber", data.subscriber);
  }
  return data;
}
export async function deleteSubscriber(
  context: any,
  { subscriberId }: any
): Promise<ISubscriber[]> {
  const response = await services.deleteOneSubscriber(subscriberId);
  const data = get(response, "data", {});
  if (data.success) {
    context.commit("removeSubscriber", data.subscriber);
  }
  return data;
}
export async function createSubscriber(
  context: any,
  { update }: any
): Promise<ISubscriber[]> {
  const response = await services.createOneSubscriber(update);
  const data = get(response, "data", {});
  if (data.success) {
    context.commit("setSubscriber", data.subscriber);
  }
  return data;
}
