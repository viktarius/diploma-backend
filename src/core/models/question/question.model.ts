import { CheckQuestion } from "./check-question.model";
import { TextQuestion } from "./text-question.model";

export type Question = CheckQuestion | TextQuestion;
