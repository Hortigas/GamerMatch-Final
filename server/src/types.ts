export type CreateSessionDTO = {
  email: string;
  hash: string;
}

type UserData = {
  hash: string;
  permissions: string[];
  roles: string[];
}

export type UsersStore = Map<string, UserData>

export type RefreshTokensStore = Map<string, string[]>

export type DecodedToken = {
  sub: string;
}