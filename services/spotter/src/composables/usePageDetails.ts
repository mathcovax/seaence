export function usePageDetails<
	GenericDependencies extends Record<string, unknown>,
	GenericDetails extends Record<string, unknown>,
>(
	getDependencies: () => GenericDependencies,
	fetchDetails: (dependencies: GenericDependencies) => Promise<GenericDetails>,
) {
	const details = ref<GenericDetails | null>(null);

	function findDetails(dependencies: GenericDependencies) {
		void fetchDetails(dependencies)
			.then((value) => {
				details.value = value;
			});
	}

	watch(
		getDependencies,
		findDetails,
		{ immediate: true },
	);

	function trigger() {
		findDetails(
			getDependencies(),
		);
	}

	return {
		trigger,
		details,
	};
}
