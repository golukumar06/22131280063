export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidShortCode = (code) => /^[a-zA-Z0-9]{4,10}$/.test(code);

export const isValidExpiry = (minutes) => {
  const num = parseInt(minutes, 10);
  return !isNaN(num) && num > 0 && num <= 10080; // up to 7 days
};
