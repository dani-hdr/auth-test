import { useEffect, useState, useCallback } from "react";

function isBrowser(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export default function useLocalStorage(
  key: string,
  initialValue: string | null = null
): [string | null, (value: string | null) => void] {
  const readValue = (): string | null => {
    if (!isBrowser()) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<string | null>(readValue);

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      try {
        if (!isBrowser()) return;
        if (value === null) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, value);
        }
        setStoredValue(value);
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch {
        // no-op
      }
    },
    [key]
  );

  useEffect(() => {
    if (!isBrowser()) return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      setStoredValue(readValue());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue];
}
