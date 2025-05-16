export function useWindow() {
	function refresh() {
		window.location.reload();
	}
	return {
		refresh,
	};
}
