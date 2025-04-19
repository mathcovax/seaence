import { toast } from "vue-sonner";

export function useSonner() {
	return {
		sonnerError: toast.error,
		sonnerMessage: toast.message,
		sonnerWarning: toast.warning,
	};
}
