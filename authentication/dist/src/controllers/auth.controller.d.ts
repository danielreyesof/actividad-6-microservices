export declare const signup: (req: any, res: any) => Promise<any>;
export declare const signin: (req: any, res: any) => Promise<any>;
export declare const logout: (req: {
    headers: {
        [x: string]: any;
    };
}, res: any) => Promise<void>;
