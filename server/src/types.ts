export type CreateSessionDTO = {
    email: string;
    hash: string;
};

export type CreateUser = {
    username: string;
    email: string;
    hash: string;
};

export type CreateMessage = {
    message: string;
    sender: number;
    receiver: number;
};

export type GoogleProps = {
    name: string;
    email: string;
};

export type UserData = {
    id: number;
    user_email: string;
    user_password: string;
    user_name: string;
    providerAuth: boolean;
};

export type RefreshTokensStore = Map<string, string[]>;

export type DecodedToken = {
    sub: string;
};
