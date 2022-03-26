import { IStoreState, ISubscriber } from "@/@types";

export const getOneSubscriber: (
  state: IStoreState
) => (id: string) => ISubscriber | undefined =
  (state: IStoreState) => (id: string) => {
    return state.subscribers.find((subscriber) => subscriber._id === id);
  };
