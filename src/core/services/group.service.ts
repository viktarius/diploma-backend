import { Group } from '../models';
import { GroupsCollection } from "../schemas";
import { Types } from "mongoose";

export const create = (body: Group, user_id: string) => {
    const group = {
        admin: user_id,
        ...body,
    };
    return GroupsCollection.create(group)
};

export const getById = (id: string) => {
    return GroupsCollection.findById(id)
        .populate({path: 'admin', select: '_id email displayed_name'})
        .populate({path: 'participants', select: '_id email displayed_name'})
        .populate({path: 'invited', select: '_id email displayed_name'})
        .populate({path: 'requested', select: '_id email displayed_name'});
};

export const deleteById = (id: string) => {
    return GroupsCollection.findByIdAndDelete(id);
};

export const getGroupPreview = (userId: string) => {
    return GroupsCollection.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: "admin",
                foreignField: "_id",
                as: "admin"
            }
        },
        {$unwind: "$admin"},
        {
            $project: {
                "_id": 1,
                "label": 1,
                "privacyType": 1,
                "admin._id": 1,
                "admin.displayed_name": 1,
                "participants": {$size: {$ifNull: ["$participants", []]}},
                "requested": {$in: [Types.ObjectId(userId), "$requested"]},
                "invited": {$in: [Types.ObjectId(userId), "$invited"]},
                "participated": {$in: [Types.ObjectId(userId), "$participants"]},
                "manager": {$in: [Types.ObjectId(userId), {$ifNull: ["$managers", []]}]}
            }
        }
    ]);
};

export const getUserGroups = (userId: string) => {
    return GroupsCollection.aggregate([
        {
            $match: {
                $or: [{
                    "admin": Types.ObjectId(userId)
                }, {
                    "participants": {$in: [Types.ObjectId(userId), "$participants"]}
                }]
            }
        }
    ])
};

export const getAvailableGroupsForUser = (userId: string) => {
    return GroupsCollection.aggregate([
        {
            $match: {
                $or: [{
                    "admin": Types.ObjectId(userId),
                }, {
                    "managers": {$in: [Types.ObjectId(userId), "$managers"]}
                }]
            }
        },
        {
            $project: {
                "_id": 1,
                "label": 1,
            }
        }
    ])
};

export const addUserTo = (groupId: string, userId: string, addTo: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {$push: {[addTo]: userId}})
};

export const removeUserFrom = (groupId: string, userId: string, removeFrom: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {$pull: {[removeFrom]: userId}});
};

export const acceptUser = (groupId: string, userId: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {
        $pull: {"requested": userId},
        $push: {"participants": userId}
    })
};

export const acceptInvite = (groupId: string, userId: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {
        $pull: {"invited": userId},
        $push: {"participants": userId}
    })
};

export const leaveGroup = (groupId: string, userId: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {
        $pull: {"participants": userId}
    })
};


