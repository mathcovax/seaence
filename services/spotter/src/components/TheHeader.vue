<script setup lang="ts">
const { HOME_PAGE, CONNECTION_PAGE } = routerPageName;
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
