import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";
import {
  getStorageItem,
  setStorageItemAsync,
  deleteStorageItemAsync,
} from "../utils/secureStore";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();
  // Get
  React.useEffect(() => {
    const value = getStorageItem(key);
    setState(value);
  }, [key]);

  // Set
  const setValue = React.useCallback(
    async (value: string | null) => {
      setState(value);
      await setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
