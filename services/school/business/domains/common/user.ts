import { C } from "@duplojs/utils";

export const UserId = C.createNewType("UserId", C.String);
export type UserId = C.GetNewType<typeof UserId>;

export const UserName = C.createNewType("UserName", C.String);
export type UserName = C.GetNewType<typeof UserName>;
