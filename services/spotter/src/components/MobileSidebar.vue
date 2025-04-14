<script setup lang="ts">
import { mdiMenu } from "@mdi/js";
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

		<DSSheetContent class="flex flex-col">
			<DSSheetHeader class="mb-4">
				<RouterLink :to="homePage.createTo()">
					<DSImage
						src="/images/logos/logo-text.svg"
						alt="Seaence"
						class="w-[196px] h-[56px]"
					/>
				</RouterLink>
			</DSSheetHeader>

			<div class="flex-1 py-4 flex flex-col justify-between">
				<DSInputSearch
					:placeholder="$t('cta.search')"
					:button-text="$t('cta.search')"
					no-shadow
				/>

				<div class="flex flex-col gap-2">
					<DSSheetClose as-child>
						<DSButtonPrimary as-child>
							<RouterLink :to="connectionPage.createTo()">
								{{ $t("cta.connection") }}
							</RouterLink>
						</DSButtonPrimary>
					</DSSheetClose>
				</div>
			</div>
		</DSSheetContent>
	</DSSheet>
</template>
