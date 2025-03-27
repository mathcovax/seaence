<script setup lang="ts">
import { mdiMenu } from "@mdi/js";

const { SEARCH_PAGE, CONNECTION_PAGE } = routerPageName;
</script>

<template>
	<DSSheet>
		<DSSheetTrigger
			as-child
			class="md:hidden"
		>
			<DSButtonIcon variant="outline">
				<TheIcon :icon="mdiMenu" />
			</DSButtonIcon>
		</DSSheetTrigger>

		<DSSheetContent>
			<DSSheetHeader class="mb-4">
				<img
					src="/images/logos/logo-text.svg"
					alt="Spotter"
					class="h-14"
				>
			</DSSheetHeader>

			<div class="grid gap-8 py-4">
				<nav>
					<ul>
						<li>
							<DSSheetClose as-child>
								<RouterLink :to="{ name: SEARCH_PAGE }">
									{{ $t("layout.base.header.nav.search") }}
								</RouterLink>
							</DSSheetClose>
						</li>
					</ul>
				</nav>

				<div class="flex flex-col gap-2">
					<DSSheetClose as-child>
						<DSButtonPrimary as-child>
							<RouterLink :to="{ name: CONNECTION_PAGE }">
								{{ $t("cta.connection") }}
							</RouterLink>
						</DSButtonPrimary>
					</DSSheetClose>
				</div>
			</div>
		</DSSheetContent>
	</DSSheet>
</template>
