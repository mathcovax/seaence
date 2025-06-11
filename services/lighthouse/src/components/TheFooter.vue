<script setup lang="ts">
import { dashboardPage } from "@/domains/dashboard/dashboardPage/router";
</script>

<template>
	<footer class="bg-background border-t border-gray-200">
		<div class="container py-8">
			<nav>
				<ul class="flex gap-4 md:gap-8">
					<li>
						<RouterLink
							:to="dashboardPage"
							class="router-link-active router-link-exact-active hover:text-primary"
						>
							{{ $t('layout.footer.nav.dashboard') }}
						</RouterLink>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>
