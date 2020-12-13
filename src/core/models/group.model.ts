import { Document } from "mongoose";
import { GroupType } from "./group-type.enum";

export interface Group extends Document {
    label: string;
    participants: Array<string>;
    admin: string;
    type: GroupType,
    isDeleted: boolean;
}
