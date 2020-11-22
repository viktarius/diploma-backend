import sha256 from "sha256";

import { User } from "../models";
import { UserCollection } from '../schemas'

export const create = (user: User) => {
    const newUser = {
        ...user,
        password: sha256(user.password),
        isActive: true
    };
    return UserCollection.create(newUser)
};
