export {};

declare global {
    interface Window {
        __ENV: {
            REACT_APP_WORKER_URL: string
        };
    }
}