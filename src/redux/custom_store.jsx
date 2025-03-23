import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// No-op storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Conditionally create storage based on environment
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export default storage;
