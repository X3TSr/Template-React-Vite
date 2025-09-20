/**
 * A collection of strongly-typed, optimized, and documented array utilities.
 */
export const ArrayUtils = {
    /**
     * Check if an array is empty.
     * @example ArrayUtils.isEmpty([]) // true
     */
    isEmpty<T>(array: T[]): boolean {
        return array.length === 0;
    },

    /**
     * Compare two arrays for equality.
     * @param deep Whether to check nested arrays/objects deeply (default: false).
     * @example ArrayUtils.isEqual([1,2], [1,2]) // true
     * @example ArrayUtils.isEqual([1,[2]], [1,[2]], true) // true
     */
    isEqual<T>(a: T[], b: T[], deep: boolean = false): boolean {
        if (a.length !== b.length) return false;
        return a.every((val, i) =>
            deep && typeof val === "object" && typeof b[i] === "object"
                ? ArrayUtils.isEqual(val as any[], b[i] as any[], true)
                : val === b[i]
        );
    },

    /**
     * Combine arrays into a union (unique values).
     * @example ArrayUtils.union([1,2], [2,3]) // [1,2,3]
     */
    union<T>(a: T[], b: T[]): T[] {
        return Array.from(new Set([...a, ...b]));
    },

    /**
     * Return elements present in both arrays.
     * @example ArrayUtils.intersection([1,2,3], [2,3,4]) // [2,3]
     */
    intersection<T>(a: T[], b: T[]): T[] {
        const setB = new Set(b);
        return a.filter(v => setB.has(v));
    },

    /**
     * Return elements in a but not in b.
     * @example ArrayUtils.difference([1,2,3], [2]) // [1,3]
     */
    difference<T>(a: T[], b: T[]): T[] {
        const setB = new Set(b);
        return a.filter(v => !setB.has(v));
    },

    /**
     * Flatten nested arrays.
     * @param depth How deep to flatten (default: Infinity).
     * @example ArrayUtils.flatten([1, [2, [3]]], 2) // [1,2,3]
     */
    flatten<T>(a: any[], depth: number = Infinity): T[] {
        return a.flat(depth) as T[];
    },

    /**
     * Return unique values in array.
     * @example ArrayUtils.unique([1,1,2,3]) // [1,2,3]
     */
    unique<T>(a: T[]): T[] {
        return [...new Set(a)];
    },

    /**
     * Split an array into chunks of given size.
     * @example ArrayUtils.chunk([1,2,3,4], 2) // [[1,2],[3,4]]
     */
    chunk<T>(array: T[], size: number): T[][] {
        if (size <= 0) throw new Error("Size must be > 0");
        const result: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    },

    /**
     * Remove falsy values (null, undefined, 0, "", false, NaN).
     * @example ArrayUtils.compact([0, 1, false, 2, "", 3]) // [1,2,3]
     */
    compact<T>(array: (T | null | undefined | false | "" | 0)[]): T[] {
        return array.filter(Boolean) as T[];
    },

    /**
     * Group array items by a key function.
     * @example ArrayUtils.groupBy(["one","two","three"], w => w.length)
     * // { 3: ["one","two"], 5: ["three"] }
     */
    groupBy<T, K extends string | number>(
        array: T[],
        keyFn: (item: T) => K
    ): Record<K, T[]> {
        return array.reduce((acc, item) => {
            const key = keyFn(item);
            (acc[key] ??= []).push(item);
            return acc;
        }, {} as Record<K, T[]>);
    },

    /**
     * Count occurrences by a key function.
     * @example ArrayUtils.countBy(["a","b","a"], x => x) // { a: 2, b: 1 }
     */
    countBy<T, K extends string | number>(
        array: T[],
        keyFn: (item: T) => K
    ): Record<K, number> {
        return array.reduce((acc, item) => {
            const key = keyFn(item);
            acc[key] = (acc[key] ?? 0) + 1;
            return acc;
        }, {} as Record<K, number>);
    },

    /**
     * Shuffle an array (Fisher–Yates).
     * @example ArrayUtils.shuffle([1,2,3]) // [2,1,3] (random)
     */
    shuffle<T>(array: T[]): T[] {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
} as const;
