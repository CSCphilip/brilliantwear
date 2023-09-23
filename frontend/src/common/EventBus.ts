const eventBus = {
  on<T>(event: string, callback: (data: T) => void) {
    document.addEventListener(event, (e) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        callback(customEvent.detail as T);
      }
    });
  },
  dispatch<T>(event: string, data: T) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove<T>(event: string, callback: (data: T) => void) {
    document.removeEventListener(event, callback as EventListener);
  },
};

export default eventBus;
