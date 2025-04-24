export declare const db: import("sqlite3").Database;
export declare function dbGet<T>(sql: string, params: any[]): Promise<T | undefined>;
export declare function dbRun(sql: string, params: any[]): Promise<void>;
export declare function dbAll<T>(sql: string, params: any[]): Promise<T[]>;
