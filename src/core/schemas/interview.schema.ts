import { model, Schema } from "mongoose";

import { Interview } from "../models";

const InterviewSchema: Schema = new Schema({
    label: {type: String, required: true},
    questions: [Schema.Types.Mixed],
    created_at: {type: Date},
    updated_at: {type: Date}
}, {versionKey: false});

export default model<Interview>('Interview', InterviewSchema)
