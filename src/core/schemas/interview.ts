import { Schema, model } from "mongoose";

import { Interview } from "../models";

const InterviewSchema: Schema = new Schema({
    name: {type: String, required: true}
});

export default model<Interview>('Interview', InterviewSchema)
