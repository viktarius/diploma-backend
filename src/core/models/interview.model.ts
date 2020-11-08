import {Document} from "mongoose";

export interface Interview extends Document{
    label: string;
    updated_at: Date;
    create_at: Date;
}
