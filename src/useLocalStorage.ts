import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    
    const setValue = (value: T) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            setStoredValue(value);
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;