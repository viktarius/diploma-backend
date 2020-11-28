import { model, Schema } from "mongoose";
import { Answer } from "../models";

const AnsSchema: Schema = new Schema<any>({
    question_id: {type: String, required: true},
    answer: {type: String, required: true},
}, {versionKey: false});

const AnswerSchema: Schema = new Schema({
    user_id: {type: String, required: true},
    interview_id: {type: String, required: true},
    answers: [AnsSchema]
}, {versionKey: false});

export default model<Answer>('Answers', AnswerSchema);
