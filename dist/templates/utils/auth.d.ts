export declare function createSession(userId: string): Promise<string>;
export declare function getSession(): Promise<{
    userId: string;
} | null>;
export declare function generateOTP(email: string): Promise<{
    code: string;
    userId: string;
}>;
export declare function verifyOTP(userId: string, code: string): Promise<boolean>;
export declare function isEmailAllowed(email: string): Promise<boolean>;
