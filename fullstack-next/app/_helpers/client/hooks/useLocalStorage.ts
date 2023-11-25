import { useEffect, useState } from "react";

// Based on: https://www.youtube.com/watch?v=lATafp15HWA

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  const [readFromLocalStorage, setReadFromLocalStorage] = useState(false);

  useEffect(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) {
      setValue(JSON.parse(jsonValue));
    }
    setReadFromLocalStorage(true);
  }, []);

  useEffect(() => {
    if (readFromLocalStorage === true) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
