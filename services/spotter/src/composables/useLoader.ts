import { ref } from "vue";

const isLoading = ref(false);

export function useLoader() {
	function setLoading(value: boolean) {
		isLoading.value = value;
		document.body.classList.toggle("overflow-hidden", value);
	}

	return { isLoading, setLoading };
}
