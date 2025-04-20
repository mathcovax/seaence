const smoothTime = 200;

const { isEnabled, enable, disable } = useSmoothEnabled(smoothTime);

export function useLoader() {
	return {
		loaderIsEnabled: isEnabled,
		enableLoader: enable,
		disableLoader: disable,
	};
}
