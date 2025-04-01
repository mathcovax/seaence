<script setup lang="ts">
import { mdiMenu } from "@mdi/js";

const { CONNECTION_PAGE } = routerPageName;
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
			<DSSheetHeader>
				<img
					src="/images/logos/logo-text.svg"
					alt="Spotter"
					class="h-14"
				>
			</DSSheetHeader>

			<div class="grid gap-4 py-4">
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
