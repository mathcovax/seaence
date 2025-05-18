<script setup lang="ts">
import AccountDropdown from "@/domains/user/components/AccountDropdown.vue";
import { useUserInformation } from "@/domains/user/composables/useUserInformation";
import DSIcon from "@vendors/design-system/components/ui/icon/DSIcon.vue";

const { isConnected } = useUserInformation();
const { isScrolled } = useScroll({ allowScrollEvent: true });
</script>

<template>
	<header
		class="sticky top-0 left-0 z-50 bg-white transition-shadow duration-300"
		:class="{ 'shadow-md': isScrolled }"
	>
		<div class="container h-[var(--header-height)] flex items-center justify-between">
			<RouterLink :to="homePage.createTo()">
				<DSImage
					src="/images/logos/logo-text.svg"
					alt="Seaence"
					class="hidden sm:block w-[132px] h-[38px]"
				/>

				<DSImage
					src="/images/logos/logo.svg"
					alt="Seaence"
					class="block sm:hidden size-[38px]"
				/>
			</RouterLink>

			<div class="flex gap-8 items-center">
				<nav>
					<ul class="flex gap-4 text-primary">
						<li>
							<RouterLink
								class="flex gap-1 items-center hover:underline"
								:to="simpleSearchPage"
								:title="$t('layout.base.header.link.simpleSearch')"
							>
								<DSIcon name="magnify" />

								<span class="hidden sm:block">{{ $t("layout.base.header.link.search") }}</span>

								<span>{{ $t("layout.base.header.link.simple") }}</span>
							</RouterLink>
						</li>

						<li>
							<RouterLink
								class="flex gap-1 items-center hover:underline"
								:to="advancedSearchPage"
								:title="$t('layout.base.header.link.advancedSearch')"
							>
								<DSIcon name="magnifyPlus" />

								<span class="hidden sm:block">{{ $t("layout.base.header.link.search") }}</span>

								<span>{{ $t('layout.base.header.link.advanced') }}</span>
							</RouterLink>
						</li>
					</ul>
				</nav>

				<DSButtonPrimary
					v-if="!isConnected"
					as-child
					class="md:inline-flex"
					:title="$t('cta.connection')"
				>
					<RouterLink :to="connectionPage.createTo()">
						<DSIcon name="login" />
					</RouterLink>
				</DSButtonPrimary>

				<AccountDropdown v-else />
			</div>
		</div>
	</header>
</template>
