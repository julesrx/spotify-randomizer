import { createStorage, type StorageValue } from 'unstorage';
import ibb from 'unstorage/drivers/indexedb';

const storage = createStorage({ driver: ibb({ base: 'cache' }) });

// TODO: set short cache expiration

const get = async <T extends StorageValue>(id: string) => {
  return await storage.getItem<T>(id);
};

const set = async <T extends StorageValue>(id: string, value: T) => {
  return await storage.setItem<T>(id, value);
};

const gset = async <T extends StorageValue>(id: string, getter: () => T | Promise<T>) => {
  const cached = await get<T>(id);
  if (cached) return cached;

  const res = await getter();

  await set(id, res);
  return res;
};

export default { get, set, gset };
