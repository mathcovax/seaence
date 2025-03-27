<script setup lang="ts">
</script>

<template>
	<footer class="bg-white">
		<div class="container py-8">
			<nav>
				<ul class="flex gap-4 md:gap-8">
					<li>
						<RouterLink
							to=""
							class="hover:text-primary"
						>
							{{ $t("layout.base.footer.nav.conditions") }}
						</RouterLink>
					</li>

					<li>
						<RouterLink
							to=""
							class="hover:text-primary"
						>
							{{ $t("layout.base.footer.nav.about") }}
						</RouterLink>
					</li>

					<li>
						<RouterLink
							to=""
							class="hover:text-primary"
						>
							{{ $t("layout.base.footer.nav.support") }}
						</RouterLink>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>
