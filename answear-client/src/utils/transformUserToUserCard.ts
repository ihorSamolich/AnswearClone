import { IUser, IUserCard } from "interfaces/user";

export const transformUserToUserCard = (user: IUser): IUserCard => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
};
