<script setup lang="ts">
import type { notificationListPage } from "@/domains/notification/router";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";

const { disconect } = useUserInformation();
</script>

<template>
	<DSDropdownMenu>
		<DSDropdownMenuTrigger>
			<DSOutlineButton
				square
				rounded
			>
				<DSIcon name="account" />
			</DSOutlineButton>
		</DSDropdownMenuTrigger>

		<DSDropdownMenuContent align="end">
			<DSDropdownMenuItem>
				<RouterLink :to="profilePage.createTo()">
					{{ $t("layout.base.header.accountDropdown.profile") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuSeparator />

			<DSDropdownMenuItem>
				<RouterLink :to="notificationListPage.createTo()">
					{{ $t("layout.base.header.accountDropdown.notification") }}
				</RouterLink>
			</DSDropdownMenuItem>

			<DSDropdownMenuSeparator />

			<DSDropdownMenuItem @click="disconect">
				<span class="cursor-pointer">{{ $t("layout.base.header.accountDropdown.disconnect") }}</span>
			</DSDropdownMenuItem>
		</DSDropdownMenuContent>
	</DSDropdownMenu>
</template>
