export declare const addNote: ({ body, headers }: any, res: any) => Promise<Error | undefined>;
export declare const updateNote: ({ body, headers }: any, res: any) => Promise<Error | undefined>;
export declare const getNoteByUser: ({ headers }: any, res: any) => Promise<Error | undefined>;
export declare const getNoteById: ({ headers, params }: any, res: any) => Promise<Error | undefined>;
export declare const deleteNote: ({ params, headers }: any, res: any) => Promise<Error | undefined>;
