import { C, DP } from "@duplojs/utils";

export const UserId = C.createNewType("userId", DP.string());
export type UserId = C.GetNewType<typeof UserId>;
