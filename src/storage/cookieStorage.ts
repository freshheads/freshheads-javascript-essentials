import { createBrowserStorage } from './browserStorage';
import cookieStorageClient from 'js-cookie';

// Create storage driver for cookies that uses js-cookie beneath the hood for easy cookie management
const cookieStorage: Storage = {
    length: 0,
    clear: () => {
        const allCookies = cookieStorageClient.get();

        Object.keys(allCookies).forEach((key) =>
            cookieStorageClient.remove(key)
        );
    },
    getItem: (key: string): string | null => {
        return cookieStorageClient.get(key) || null;
    },
    key: (index: number): string | null => {
        const allCookies = cookieStorageClient.get();

        const keyAtIndex = Object.keys(allCookies)[index];

        if (typeof keyAtIndex === undefined) {
            return null;
        }

        return allCookies[keyAtIndex];
    },
    removeItem: (key: string): void => {
        cookieStorageClient.remove(key);
    },
    setItem: (key: string, value: string): void => {
        cookieStorageClient.set(key, value);
    },
};

export const { get, getInt, getBoolean, write } = createBrowserStorage(
    cookieStorage
);
