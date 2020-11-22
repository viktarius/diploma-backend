import { Document } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    first_name: string;
    surname: string;
    displayed_name: string;
    isActive: boolean;
}
