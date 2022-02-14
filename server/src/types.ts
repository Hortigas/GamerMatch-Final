export type CreateSessionDTO = {
    email: string;
    hash: string;
};

export type CreateUser = {
    username: string;
    email: string;
    hash: string;
};

export type Message = {
    message: string;
    sender: number;
    receiver: number;
    match: number;
    timestamp: string;
};

export type Matches = {
    user_id_1: number;
    user_id_2: number;
    timestamp: string;
};

export type Games = {
    user_id: number;
};

export type GoogleProps = {
    name: string;
    email: string;
    picture: string;
};

export type UserData = {
    id: number;
    user_email: string;
    user_password: string;
    user_name: string;
    providerAuth: boolean;
    user_photo: string;
    user_aboutme: string;
    birth_date?: Date;
};

export type RefreshTokensStore = Map<string, string[]>;

export type DecodedToken = {
    sub: string;
};
