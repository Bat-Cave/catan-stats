import { useState, useEffect } from "react";

const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    let currentValue: T;

    try {
      const storedValue = localStorage.getItem(key);
      currentValue = storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
};

export default useLocalStorage;
