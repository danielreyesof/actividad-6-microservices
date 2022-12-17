export declare const checkDuplicatedUsernameOrEmail: (req: {
    body: {
        username: any;
        email: any;
    };
}, res: any, next: any) => Promise<any>;
export declare const checkRolesExisted: (req: {
    body: {
        roles: string | any[];
    };
}, res: any, next: any) => any;
