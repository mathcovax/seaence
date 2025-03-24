<script setup lang="ts">
const { HOME_PAGE } = routerPageName;
</script>

<template>
	<section class="flex flex-col items-center justify-center h-[calc(100vh-6rem-2rem)] gap-4">
		<img src="/images/edito/404.png" alt="404" class="w-full max-w-2xs" />
		<h1 class="text-4xl font-bold text-center">404 - Page non trouvée</h1>
		<p class="text-center text-muted-foreground">La page que vous cherchez n'existe pas.</p>
		<DSButtonPrimary as-child>
			<RouterLink :to="{ name: HOME_PAGE }">Retour à l'accueil</RouterLink>
		</DSButtonPrimary>
	</section>
</template>
