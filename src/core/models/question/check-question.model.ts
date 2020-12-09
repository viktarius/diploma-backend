import { QuestionType } from "./question-type.enum";

export interface CheckQuestion {
    label: string;
    options: Array<string>;
    type: QuestionType;
}
