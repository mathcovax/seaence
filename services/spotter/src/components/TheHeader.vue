<script setup lang="ts">
const { HOME_PAGE, CONNECTION_PAGE } = routerPageName;

const isScrolled = ref(false);

const SCROLL_THRESHOLD = 0;
function handleScroll() {
	isScrolled.value = window.scrollY > SCROLL_THRESHOLD;
}

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
	handleScroll();
});

onUnmounted(() => {
	window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
	<header
		class="sticky top-0 left-0 z-50 bg-white transition-shadow duration-300"
		:class="{ 'shadow-md': isScrolled }"
	>
		<div class="container h-24 flex items-center justify-between">
			<RouterLink
				:to="{ name: HOME_PAGE }"
				class="hover:text-primary"
			>
				<DSImage
					src="/images/logos/logo-text.svg"
					alt="Seaence"
					class="block md:hidden lg:block w-48 h-14"
				/>

				<DSImage
					src="/images/logos/logo.svg"
					alt="Seaence"
					class="hidden md:block lg:hidden size-14"
				/>
			</RouterLink>

			<SearchOverlay />

			<div class="hidden md:block space-x-2">
				<DSButtonPrimary as-child>
					<RouterLink :to="{ name: CONNECTION_PAGE }">
						{{ $t("cta.connection") }}
					</RouterLink>
				</DSButtonPrimary>
			</div>

			<MobileSidebar />
		</div>
	</header>
</template>
