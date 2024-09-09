function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  url: {
    base: required('REACT_APP_BASE_URL', 'http://localhost:8080'),
  },
};
