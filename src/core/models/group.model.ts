import { Document } from "mongoose";
import { GroupType } from "./group-type.enum";

export interface Group extends Document {
    label: string;
    participants: Array<string>;
    invited: Array<string>;
    requested: Array<string>;
    admin: string;
    type: GroupType,
    isDeleted: boolean;
}
