let addNotificationExternal: ((msg: string) => void) | null = null;

export function setNotificationHandler(fn: (msg: string) => void) {
  addNotificationExternal = fn;
}

export function notifyFrontend(msg: string) {
  if (addNotificationExternal) {
    addNotificationExternal(msg);
  }
}
