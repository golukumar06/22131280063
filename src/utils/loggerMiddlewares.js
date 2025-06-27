const logStore = [];

export const logAction = (action, meta = {}) => {
  const entry = {
    action,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  logStore.push(entry);
};

export const getLogs = () => logStore;
