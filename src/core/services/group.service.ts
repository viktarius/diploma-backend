import { Group } from '../models';
import { GroupsCollection } from "../schemas";

export const create = (body: Group, user_id: string) => {
    const group = {
        admin: user_id,
        ...body,
    };
    return GroupsCollection.create(group)
};

export const getAll = () => {
    return GroupsCollection.find({});
};

export const getById = (id: string) => {
    return GroupsCollection.findById(id)
        .populate({path: 'admin', select: '_id email displayed_name'})
        .populate({path: 'participants', select: '_id email displayed_name'})
        .populate({path: 'invited', select: '_id email displayed_name'})
        .populate({path: 'requested', select: '_id email displayed_name'});
};

export const getGroupPreview = () => {
    return GroupsCollection.find({}).select('label admin')
        .populate({path: 'admin', select: 'first_name surname'});
};

export const inviteUser = (groupId: string, userId: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {$push: {'invited': userId}})
};

export const removeFrom = (groupId: string, userId: string, removeFrom: string) => {
    return GroupsCollection.findByIdAndUpdate(groupId, {$pull: {[removeFrom]: userId}});
};
