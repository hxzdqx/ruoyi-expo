import { create } from "zustand";
import userSlice, { type User } from "./user";

export const useUserStore = create<User>((...reg) => ({
  ...userSlice(...reg),
}));
