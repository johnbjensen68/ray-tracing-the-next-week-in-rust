import { useSyncExternalStore } from "react";

export function useLocalStorage(storageKey: string, initialValue: string) {
  const subscribe = (onStoreChange: () => void) => {
    window.addEventListener("storage", onStoreChange);
    return () => {
      window.removeEventListener("storage", onStoreChange);
    };
  };

  const getSnapShot = () => {
    const state = localStorage.getItem(storageKey);
    return state;
  };

  const value = useSyncExternalStore(
    subscribe,
    getSnapShot,
    () => initialValue,
  );

  const saveValue = (value: string) => {
    localStorage.setItem(storageKey, value);
    window.dispatchEvent(new Event("storage"));
  };

  return [value, saveValue] as const;
}
