<script setup lang="ts">
const { HOME_PAGE, SEARCH_PAGE, REGISTER_PAGE, LOGIN_PAGE } = routerPageName;

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
				<img
					src="/images/logos/logo-text.svg"
					alt="Spotter"
					class="hidden md:block"
				>

				<img
					src="/images/logos/logo.svg"
					alt="Spotter"
					class="md:hidden"
				>
			</RouterLink>

			<nav class="hidden md:block">
				<ul>
					<li>
						<RouterLink
							:to="{ name: SEARCH_PAGE }"
							class="hover:text-primary"
						>
							{{ $t("layout.base.header.nav.search") }}
						</RouterLink>
					</li>
				</ul>
			</nav>

			<div class="hidden md:block space-x-2">
				<DSButtonOutline as-child>
					<RouterLink
						:to="{ name: REGISTER_PAGE }"
						class="hover:text-primary"
					>
						{{ $t("cta.register") }}
					</RouterLink>
				</DSButtonOutline>

				<DSButtonPrimary as-child>
					<RouterLink
						:to="{ name: LOGIN_PAGE }"
					>
						{{ $t("cta.login") }}
					</RouterLink>
				</DSButtonPrimary>
			</div>

			<MobileSidebar />
		</div>
	</header>
</template>
