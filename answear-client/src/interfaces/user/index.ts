export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    lockoutEnd: string | null;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ISignInResponse {
    token: string;
}

export interface IResetPassword {
    password: string;
    token: string;
    email: string;
}

export interface IForgotPassword {
    email: string;
}

export interface IUserCard {
    firstName?: string;
    lastName?: string;
    email: string;
}
