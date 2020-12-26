import { v4 as uuid } from 'uuid';

import { InterviewCollection } from "../schemas";
import { Interview } from "../models";
import { GroupService } from "./index";
import { Types } from "mongoose";

export const getInterviewPreview = async (userId: string) => {
    const userGroups = await GroupService.getUserGroups(userId);
    const groupIds = userGroups.map(group => group._id);
    return InterviewCollection
        // .aggregate([{
        //     $match: {
        //         // $or: [{
        //             'is_public_interview': {$eq: true}
        //             // }, {
        //             //     admin: Types.ObjectId(userId)
        //         // }, {
        //         //     assigned_to_group: {$in: ["$assigned_to_group", groupIds]}
        //         // }]
        //     }
        // }, {
        //     $lookup: {
        //         from: 'users',
        //         localField: "admin",
        //         foreignField: "_id",
        //         as: "admin"
        //     }
        // }, {
        //     $unwind: "$admin"
        // }, {
        //     $project: {
        //         "_id": 1,
        //         "label": 1,
        //         "admin._id": 1,
        //         "admin.displayed_name": 1
        //     }
        // }])
        .find({
            $or: [
                {'is_public_interview': {$eq: true}},
                {'admin': userId},
                {'assigned_to_group': {$in: groupIds}}
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
