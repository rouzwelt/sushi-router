export declare const memoizer: {
    fn: <FN extends (...args: never) => unknown>(fn: FN, opt?: Partial<import("memoize-fs").MemoizerOptions>) => Promise<(...args: Parameters<FN>) => Promise<ReturnType<FN>>>;
    getCacheFilePath: (fn: (...args: never) => unknown, args: unknown[], opt: Partial<import("memoize-fs").MemoizerOptions>) => string;
    invalidate: (cacheId?: string) => Promise<void>;
};
