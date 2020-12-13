import { model, Schema } from "mongoose";
import { Answer } from "../models";

const AnsSchema: Schema = new Schema<any>({
    question_id: {type: String, required: true},
    answer: {type: Schema.Types.Mixed, required: true},
}, {versionKey: false});

const AnswerSchema: Schema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
    interview_id: {type: Schema.Types.ObjectId, ref: 'Interviews'},
    answers: [AnsSchema]
}, {versionKey: false});

export default model<Answer>('Answers', AnswerSchema);
