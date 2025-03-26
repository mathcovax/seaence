<script setup lang="ts">
const { HOME_PAGE, REGISTER_PAGE, LOGIN_PAGE } = routerPageName;
</script>

<template>
	<header class="sticky top-0 left-0 z-50 bg-white">
		<div class="container h-24 flex items-center justify-between">
			<RouterLink :to="{ name: HOME_PAGE }">
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

			<div class="hidden md:block space-x-2">
				<DSButtonOutline as-child>
					<RouterLink :to="{ name: REGISTER_PAGE }">
						{{ $t("cta.register") }}
					</RouterLink>
				</DSButtonOutline>

				<DSButtonPrimary as-child>
					<RouterLink :to="{ name: LOGIN_PAGE }">
						{{ $t("cta.login") }}
					</RouterLink>
				</DSButtonPrimary>
			</div>

			<MobileSidebar />
		</div>
	</header>
</template>
