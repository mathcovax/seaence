import { type Mission } from "@business/applications/repositories/mission";
import { Observable } from "@gullerya/object-observer";

const rawQueue: Mission[] = [];

export const queue = Observable.from(rawQueue);
