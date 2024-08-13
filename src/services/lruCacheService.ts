export class LRUCacheService {
  private cache: Map<string, Record<string, number>>;
  private capacity: number;

  constructor(capacity: number) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key: string) {
    let val = this.cache.get(key);

    if (!val) {
      return;
    }

    this.cache.delete(key);
    this.cache.set(key, val);

    return val;
  }

  put(key: string, value: Record<string, number>) {
    this.cache.delete(key);

    if (this.cache.size === this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
      this.cache.set(key, value);
    } else {
      this.cache.set(key, value);
    }
  }
}
