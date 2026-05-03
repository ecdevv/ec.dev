declare global {
  interface Window {
    __bootDone: boolean;
    __bootPromise: Promise<void>;
    __bootResolve: () => void;
    bReplay: (onDone: () => void) => void;
  }
}

export {}
