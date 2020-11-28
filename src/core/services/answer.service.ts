import { Answer } from "../models";
import { AnswerCollection } from "../schemas";

export const findByUserId = (user_id: string) => {
    return AnswerCollection.findOne({user_id: user_id});
};

export const create = (body: Answer, user_id: string) => {
    const answer = {
        ...body,
        user_id
    };
    return AnswerCollection.create(answer)
};
