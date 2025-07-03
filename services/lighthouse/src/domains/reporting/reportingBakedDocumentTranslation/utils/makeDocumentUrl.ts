import { envs } from "@/envs";

export function makeDocumentUrl(documentId: string) {
	return `${envs.VITE_SPOTTER_BASE_URL}/document/${documentId}`;
}
