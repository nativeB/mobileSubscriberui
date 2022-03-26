import { IStoreState, ISubscriber } from "@/@types";

export const getOneSubscriber:any =
  (state: IStoreState) => (id: string) => {
    return state.subscribers.find((subscriber) => subscriber._id === id);
  };
