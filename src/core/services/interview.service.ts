import { v4 as uuid } from 'uuid';

import { InterviewCollection } from "../schemas";
import { Interview } from "../models";

export const getInterviewPreview = () => {
    return InterviewCollection.find({}).select('_id label admin')
        .populate({ path: 'admin', select: 'displayed_name' })
};

export const create = (body: Interview, user_id: string) => {
    const date = new Date();
    const interview = {
        ...body,
        admin: user_id,
        questions: body.questions.map(q => ({...q, id: uuid()})),
        created_at: date,
        updated_at: date,
        managers: []
    };
    return InterviewCollection.create(interview)
};

export const getAll = () => {
    return InterviewCollection.find({}).limit(50);
};

export const getById = (id: string) => {
    return InterviewCollection.findById(id)
};
