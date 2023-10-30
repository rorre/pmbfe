import { useCallback, useEffect, useState } from "react";
import { get } from "./fetcher";

type LoadState = "loading" | "loaded" | "error";

export function useForm<T extends Record<string, string>>(defaultValue: T) {
  const [formData, setFormData] = useState(defaultValue);

  const changeCallback = useCallback(
    (name: keyof T) => (e: React.FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value as T[keyof T]; // actually just as string
      setFormData((currForm) => {
        const copied = { ...currForm };
        copied[name] = value;
        return copied;
      });
    },
    []
  );

  const register = (name: keyof T) => {
    return {
      name: name,
      value: formData[name],
      onChange: changeCallback(name),
    };
  };

  return { formData, register };
}

export function useResource<T>(url: string) {
  const [state, setState] = useState<LoadState>("loading");
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    async function inner() {
      setState("loading");
      try {
        const data = await get<T>(url);
        setData(data.data);
        setState("loaded");
      } catch {
        setState("error");
      }
    }
    inner();
  }, [url]);

  return [state, data] as readonly [LoadState, T | null];
}
