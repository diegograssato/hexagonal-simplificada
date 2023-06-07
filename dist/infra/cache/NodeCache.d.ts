declare class NodeCache<T> {
    private readonly maxSize;
    private cache;
    constructor(maxSize: number);
    set(key: string, value: T): void;
    get(key: string): T | undefined;
    delete(key: string): void;
    clear(): void;
}
export default NodeCache;
