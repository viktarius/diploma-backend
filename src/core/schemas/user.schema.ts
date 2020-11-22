import { model, Schema } from "mongoose";

import {User} from '../models';

const UserSchema: Schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    surname: {type: String, required: true},
    displayed_name: {type: String, required: true},
    isActive: {type: Boolean, required: true}
}, {
    versionKey: false,
    toJSON: {
        transform: function(doc, ret){
            delete ret.password
        }
    }
});

export default model<User>('Users', UserSchema);

