import { Document } from "mongoose";
import { GroupPrivacyType } from "./group-privacy-type.enum";

export interface Group extends Document {
    label: string;
    participants: Array<string>;
    invited: Array<string>;
    requested: Array<string>;
    admin: string;
    managers: Array<string>;
    privacyType: GroupPrivacyType;
    isDeleted: boolean;
}
