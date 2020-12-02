import { Answer } from "../models";
import { AnswerCollection } from "../schemas";

export const getAll = () => {
    return AnswerCollection.find({});
};

export const findByUserId = (interview_id: string, user_id: string) => {
    return AnswerCollection.findOne({user_id, interview_id});
};

export const create = (body: Answer, user_id: string) => {
    const answer = {
        ...body,
        user_id
    };
    return AnswerCollection.create(answer)
};
