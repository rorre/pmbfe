import { atomWithStorage } from "jotai/utils";
import { User } from "./types";
import { createStore } from "jotai";

export const authTokenAtom = atomWithStorage(
  "authToken",
  JSON.parse(localStorage.getItem("authToken") ?? '""')
);
export const meAtom = atomWithStorage<User | null>(
  "me",
  JSON.parse(localStorage.getItem("me") ?? "null")
);
export const urlAtom = atomWithStorage(
  "url",
  JSON.parse(localStorage.getItem("url") ?? '""')
);
export const defaultStore = createStore();
