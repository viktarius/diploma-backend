import { Document } from "mongoose";

export interface Answer extends Document{
    user_id: string;
    interview_id: string;
    answers: Array<{
        question_id: string;
        answer: string;
    }>
}
