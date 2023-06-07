"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }
    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            const lruKey = this.cache.keys().next().value;
            this.cache.delete(lruKey);
        }
        this.cache.set(key, { key, value });
    }
    get(key) {
        const item = this.cache.get(key);
        if (item) {
            this.cache.delete(key);
            this.cache.set(key, item);
            return item.value;
        }
        return undefined;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
}
exports.default = NodeCache;
