class CacheManager {
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

export default CacheManager;
