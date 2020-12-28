import { v4 as uuid } from 'uuid';

import { InterviewCollection } from "../schemas";
import { Interview } from "../models";
import { GroupService } from "./index";

export const getInterviewPreview = async (userId: string, userEmail: string) => {
    const userGroups = await GroupService.getUserGroups(userId);
    const groupIds = userGroups.map(group => group._id);
    return InterviewCollection
        .find({
            $or: [
                {'is_public_interview': {$eq: true}},
                {'admin': userId},
                {'assigned_to_group': {$in: groupIds}},
                {'assigned_to_emails': {$in: [userEmail, "$assigned_to_emails"]}}
            ]
        })
        .select('_id label admin')
        .populate({path: 'admin', select: 'displayed_name'})
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
