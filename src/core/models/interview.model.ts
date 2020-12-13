import { Document } from "mongoose";
import { Question } from "./question";

export interface Interview extends Document {
    label: string;
    questions: Array<Question>
    updated_at: Date;
    create_at: Date;
    admin: string;
    managers: Array<string>;
}
