import { model, Schema } from "mongoose";

import { Interview } from "../models";

const InterviewSchema: Schema = new Schema({
    label: {type: String, required: true}
}, {versionKey: false});

export default model<Interview>('Interview', InterviewSchema)
