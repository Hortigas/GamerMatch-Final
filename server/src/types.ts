export type CreateSessionDTO = {
    email: string;
    hash: string;
};

export type CreateUser = {
    username: string;
    email: string;
    hash: string;
};

export type GoogleProps = {
    name: string;
    email: string;
};

type UserData = {
    hash: string;
    permissions: string[];
    roles: string[];
};

export type UsersStore = Map<string, UserData>;

export type RefreshTokensStore = Map<string, string[]>;

export type DecodedToken = {
    sub: string;
};
