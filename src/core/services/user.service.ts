import { UserCollection } from '../schemas'

export const create = (user: { email: string, password: string }) => {
    return UserCollection.create(user)
};
