import { getEvent } from "../api/event";

export default async function useEvent() {
  const events = await getEvent();
  return events;
}
