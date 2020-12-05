import { Types } from "mongoose";

import { Answer } from "../models";
import { AnswerCollection } from "../schemas";

export const getAll = () => {
    return AnswerCollection.find({});
};

export const findOne = (interview_id: string, user_id: string) => {
    return AnswerCollection.findOne({user_id, interview_id});
};

export const getAnswerStatistic = (interview_id: string) => {
    return AnswerCollection.aggregate([
        {$match: {"interview_id": Types.ObjectId(interview_id)}},
        {$unwind: "$answers"},
        {
            $group: {
                _id: "$interview_id",
                answers: {
                    $push: {answer: "$answers.answer", question_id: "$answers.question_id"}
                }
            }
        }])
};

const mockAnswer = {
    label: 'string',
    questions: [
        {
            id: 'answer_id',
            question: 'question',
            answers: [
                {
                    option: 'option1',
                    count: 2
                }, {
                    option: 'option2',
                    count: 3
                }
            ]
        }
    ]
};

export const create = (body: Answer, user_id: string) => {
    const answer = {
        ...body,
        user_id
    };
    return AnswerCollection.create(answer)
};
