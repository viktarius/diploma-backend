import { model, Schema } from "mongoose";

import { Group, GroupPrivacyType } from "../models";

const GroupSchema: Schema = new Schema({
    label: {type: String, required: true},
    participants: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    invited: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    requested: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    admin: {type: Schema.Types.ObjectId, ref: 'Users'},
    managers: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    privacyType: {type: GroupPrivacyType, required: true}
}, {versionKey: false});

export default model<Group>('Groups', GroupSchema);
