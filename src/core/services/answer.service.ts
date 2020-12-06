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
                _id: "$answers.answer",
                question_id: {$first: "$answers.question_id"},
                count: {$sum: 1}
            }
        },
        { $project: {
                _id: 0,
                answer: "$_id",
                question_id: 1,
                count: 1
            }
        }
    ])
};

export const create = (body: Answer, user_id: string) => {
    const answer = {
        ...body,
        user_id
    };
    return AnswerCollection.create(answer)
};
