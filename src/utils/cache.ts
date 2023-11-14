import { safeDestr } from "destr";

const key = (id: string) => `cache:${id}`;

const get = <T>(id: string): T | null => {
  const cached = localStorage.getItem(key(id));
  if (!cached) return null;

  return safeDestr<T>(cached);
};

const set = <T>(id: string, value: T) => {
  localStorage.setItem(key(id), JSON.stringify(value));
};

const gset = async <T>(id: string, getter: () => T | Promise<T>) => {
  const cached = get<T>(id);
  if (cached) return cached;

  const res = await getter();

  set(id, res);
  return res;
};

export default { get, set, gset };
