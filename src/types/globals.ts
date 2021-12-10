export {};

declare global {
    interface Window {
        __RUNTIME_CONFIG__: {
            NODE_ENV: string;
            REACT_APP_WORKER_URL: string;
            REACT_APP_VERSION: string;
            REACT_APP_SOURCE_URL: string;
        };
    }
}
