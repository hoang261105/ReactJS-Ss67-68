export const saveToLocal = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}