import { parentPort } from "worker_threads";
import { type WorkersMission } from ".";

if (!parentPort) {
	throw new Error("This script is done to run with worker thread.");
}

parentPort.on("message", (data: WorkersMission) => {

});
