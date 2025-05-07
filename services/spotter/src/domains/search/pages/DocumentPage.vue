<script setup lang="ts">
const { params } = documentPage.use();

// Mock data
const document = {
	abysBakedDocumentId: "doc_123456789",
	title: "Innovative Thermoelectric Solutions for IoT Applications",
	articleTypes: ["RESEARCH", "REVIEW"],
	authors: [
		{
			name: "Dr. Alice Dupont",
			affiliations: ["Université de Lille", "CNRS"],
		},
		{
			name: "Prof. John Smith",
			affiliations: null,
		},
	],
	summary: "A brief summary of the thermoelectric research applied to IoT devices.",
	abstract: "This article explores thermoelectric generation as a key energy harvesting solution for powering IoT "
		+ "systems, considering material science and electronic integration.",
	abstractDetails: [
		{
			name: "Introduction",
			content: "The growing demand for energy and expansion of IoT requires innovative energy sources.",
		},
		{
			name: "Materials and Methods",
			content: "Different thermoelectric materials were tested under varying temperature gradients.",
		},
	],
	providers: [
		{
			value: "HAL",
		},
		{
			value: "PUBMED",
		},
	],
	keywords: [
		{ value: "Thermoelectric" },
		{ value: "IoT" },
		{ value: "Energy Harvesting" },
	],
	webPublishDate: new Date("2024-11-15"),
	webPublishSplitDate: {
		day: 15,
		month: 11,
		year: 2024,
	},
	journalPublishDate: new Date("2025-01-10"),
	journalPublishSplitDate: {
		day: 10,
		month: 1,
		year: 2025,
	},
};
// End of mock data

const allAffiliations = computed(() => {
	const affiliations = new Set<string>();

	document.authors.forEach((author) => {
		if (author.affiliations) {
			for (const affiliation of author.affiliations) {
				affiliations.add(affiliation);
			}
		}
	});
	return Array.from(affiliations);
});
</script>

<template>
	<section class="min-h-screen-nh px-4 md:px-6 lg:px-8">
		<article>
			<header class="flex flex-col lg:flex-row gap-8 lg:gap-12">
				<div class="w-full lg:flex-2/3 space-y-8">
					<div class="flex flex-col gap-2">
						<h1 class="text-3xl md:text-4xl font-bold text-blue-seaence">
							{{ document.title }} ({{ params.id }})
						</h1>

						<div class="flex items-center gap-2">
							<DSIcon name="user" />

							<ul class="list-none inline">
								<li
									class="inline after:content-[',_'] last:after:content-['']"
									v-for="author in document.authors"
									:key="author.name"
								>
									{{ author.name }}
								</li>
							</ul>
						</div>

						<div class="flex items-center gap-2">
							<DSIcon name="calendar" />

							<time :datetime="document.webPublishDate.toISOString().split('T')[0]">
								{{ document.webPublishDate.toLocaleDateString() }}
							</time>
						</div>
					</div>

					<div class="space-y-4">
						<h2 class="text-xl md:text-2xl font-bold">
							Abstract
						</h2>

						<p>
							{{ document.abstract }}
						</p>
					</div>
				</div>

				<aside class="w-full lg:flex-1/3 space-y-10 lg:space-y-16">
					<div>
						<DSButtonPrimary
							class="w-full sm:w-auto bg-green-seaence hover:bg-green-seaence/90"
						>
							<DSIcon name="document" />
							Télécharger l'article
						</DSButtonPrimary>
					</div>

					<div class="space-y-6 md:space-y-8">
						<div class="space-y-4">
							<h2 class="text-xl md:text-2xl font-bold">
								Article Types
							</h2>

							<ul class="flex flex-wrap gap-2 list-none">
								<li
									v-for="(type, index) in document.articleTypes"
									:key="index"
								>
									<DSBadge class="bg-green-seaence/10 text-green-seaence">
										{{ type }}
									</DSBadge>
								</li>
							</ul>
						</div>

						<div class="space-y-4">
							<h2 class="text-xl md:text-2xl font-bold">
								Keywords
							</h2>

							<ul class="flex flex-wrap gap-2 list-none">
								<li
									v-for="(keyword, index) in document.keywords"
									:key="index"
								>
									<DSBadge class="bg-blue-seaence/10 text-blue-seaence">
										{{ keyword.value }}
									</DSBadge>
								</li>
							</ul>
						</div>

						<div
							class="space-y-4"
							v-if="allAffiliations.length"
						>
							<h2 class="text-xl md:text-2xl font-bold">
								Institutions
							</h2>

							<ul class="flex flex-wrap gap-2 list-none">
								<li
									v-for="(affiliation, index) in allAffiliations"
									:key="index"
								>
									<DSBadge class="bg-pink-seaence/10 text-pink-seaence">
										{{ affiliation }}
									</DSBadge>
								</li>
							</ul>
						</div>

						<div class="space-y-4">
							<h2 class="text-xl md:text-2xl font-bold">
								Providers
							</h2>

							<ul class="flex flex-wrap gap-2 list-none">
								<li
									v-for="(provider, index) in document.providers"
									:key="index"
								>
									<DSBadge class="bg-yellow-600/10 text-yellow-600">
										{{ provider.value }}
									</DSBadge>
								</li>
							</ul>
						</div>
					</div>
				</aside>
			</header>

			<main class="mt-12 space-y-4">
				<h2 class="text-xl md:text-2xl text-center font-bold">
					Content
				</h2>

				<section
					v-for="(detail, index) in document.abstractDetails"
					:key="index"
					class="space-y-2"
				>
					<h3 class="text-lg md:text-xl font-semibold">
						{{ detail.name }}
					</h3>

					<p>
						{{ detail.content }}
					</p>
				</section>
			</main>
		</article>
	</section>
</template>
