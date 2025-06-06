import { EventAPI } from "../type/event";
import { api_instance } from "./instance";

export const getEvent = async (): Promise<EventAPI[]> => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const response = await api_instance.get(
    `/event/monthly?year=${year}&month=${month}`
  );
  return response.data;
};
