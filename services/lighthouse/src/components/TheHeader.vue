<script setup lang="ts">
const { isScrolled } = useScroll({ allowScrollEvent: true });
</script>

<template>
	<header
		class="sticky top-0 left-0 z-50 bg-background transition-shadow duration-300"
		:class="{ 'shadow-md': isScrolled }"
	>
		<div class="container h-[var(--header-height)] flex items-center justify-between">
			<RouterLink :to="'#'">
				<DSImage
					src="/images/logos/logo-text.svg"
					alt="Seaence"
					class="hidden sm:block w-[152px] h-[38px]"
				/>

				<DSImage
					src="/images/logos/logo.svg"
					alt="Seaence"
					class="block sm:hidden size-[38px]"
				/>
			</RouterLink>

			<div class="flex gap-8 items-center">
				<nav>
					<ul class="flex gap-4 text-primary" />
				</nav>
			</div>
		</div>
	</header>
</template>
