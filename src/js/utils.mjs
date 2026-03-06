// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

const fallbackStorage = new Map();

function localStorageAvailable() {
  if (typeof window === "undefined" || !window.localStorage) {
    return false;
  }

  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  try {
    if (localStorageAvailable()) {
      return JSON.parse(window.localStorage.getItem(key));
    }
  } catch {
    // ignore and use fallback storage
  }

  const value = fallbackStorage.get(key);
  return value ? JSON.parse(value) : null;
}
// save data to local storage
export function setLocalStorage(key, data) {
  const serialized = JSON.stringify(data);

  try {
    if (localStorageAvailable()) {
      window.localStorage.setItem(key, serialized);
      return;
    }
  } catch {
    // ignore and use fallback storage
  }

  fallbackStorage.set(key, serialized);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
