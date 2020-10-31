import InterviewCollection from "../schemas/interview";
import { Interview } from "../models";

export const add = (interview: Interview) => {
    return InterviewCollection.create(interview)
};

export const getAll = () => {
    return InterviewCollection.find({}).limit(50);
};
