import { Document } from "mongoose";
import { Question } from "./question";

export interface Interview extends Document {
    label: string;
    questions: Array<Question>;
    deadline: Date;
    updated_at: Date;
    create_at: Date;
    admin: string;
    managers: Array<string>;
    is_public_interview: boolean;
    assigned_to_group: string;
    assigned_to_emails: Array<string>;
}
