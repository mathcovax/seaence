<script setup lang="ts">
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { disconect } = useUserInformation();
</script>

<template>
	<DSDropdownMenu>
		<DSDropdownMenuTrigger>
			<DSButtonOutline
				size="icon"
				class="rounded-full"
			>
				<DSIcon name="account" />
			</DSButtonOutline>
		</DSDropdownMenuTrigger>

		<DSDropdownMenuContent align="end">
			<DSDropdownMenuLabel>{{ $t("layout.base.header.accountDropdown.title") }}</DSDropdownMenuLabel>

			<DSDropdownMenuSeparator />

			<DSDropdownMenuItem>
				<RouterLink :to="profilePage.createTo()">
					{{ $t("layout.base.header.accountDropdown.profile") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuSeparator />

			<DSDropdownMenuItem @click="disconect">
				<span class="cursor-pointer">{{ $t("layout.base.header.accountDropdown.disconnect") }}</span>
			</DSDropdownMenuItem>
		</DSDropdownMenuContent>
	</DSDropdownMenu>
</template>
