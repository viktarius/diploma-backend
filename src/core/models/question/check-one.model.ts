import { QuestionType } from "./question-type.model";

export interface CheckOne {
    question: string;
    options: Array<string>;
    type: QuestionType;
}
