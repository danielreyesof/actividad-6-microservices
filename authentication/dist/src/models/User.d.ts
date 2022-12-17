/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from "mongoose";
export declare const encryptPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, recievedPassword: string) => Promise<boolean>;
declare const _default: import("mongoose").Model<{
    _id: string;
    status: number;
    date_create: Date;
    date_update: Date;
    date_delete: Date;
    username: string;
    email: string;
    email_verified_at: Date;
    password: string;
    imgURL: string;
    platform: string;
    push_token: string;
    roles: string[];
    name?: string | undefined;
}, {}, {}, {}, Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
    versionKey: false;
    _id: false;
}>, {
    _id: string;
    status: number;
    date_create: Date;
    date_update: Date;
    date_delete: Date;
    username: string;
    email: string;
    email_verified_at: Date;
    password: string;
    imgURL: string;
    platform: string;
    push_token: string;
    roles: string[];
    name?: string | undefined;
}>>;
export default _default;
