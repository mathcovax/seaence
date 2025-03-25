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
				>
			</RouterLink>

			<div class="hidden md:block space-x-2">
				<DSButtonOutline as-child>
					<RouterLink :to="{ name: REGISTER_PAGE }">
						S'inscrire
					</RouterLink>
				</DSButtonOutline>

				<DSButtonPrimary as-child>
					<RouterLink :to="{ name: LOGIN_PAGE }">
						Se connecter
					</RouterLink>
				</DSButtonPrimary>
			</div>
		</div>
	</header>
</template>
