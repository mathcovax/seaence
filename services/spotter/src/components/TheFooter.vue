<script setup lang="ts">

</script>

<template>
	<footer class="bg-background">
		<div class="container py-8">
			<nav>
				<ul class="text-sm flex gap-2 md:gap-4">
					<li>
						<RouterLink
							:to="cguPage"
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
