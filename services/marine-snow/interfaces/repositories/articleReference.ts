import { articleReferenceRepository } from "@business/applications/repositories/articleReference";
import { ArticleReferenceEntity } from "@business/domains/entities/articleReference";
import { prismaClient } from "@interfaces/providers/prisma";
import { EntityHandler } from "@vendors/clean";

articleReferenceRepository.default = {
	async save(articleReference) {
		const simpleArticleReference = articleReference.toSimpleObject();

		await prismaClient.articleReference.upsert({
			where: {
				id: {
					value: simpleArticleReference.value,
					provider: simpleArticleReference.provider,
				},
			},
			create: simpleArticleReference,
			update: simpleArticleReference,
		});

		return articleReference;
	},
	async findOne(provider, referenceValue) {
		const prismaEntity = await prismaClient.articleReference.findUnique({
			where: {
				id: {
					provider: provider.value,
					value: referenceValue.value,
				},
			},
		});

		return prismaEntity
			? EntityHandler.unsafeMapper(
				ArticleReferenceEntity,
				prismaEntity,
			)
			: null;
	},
	async findTheFirstOnes(quantity, options) {
		const ignoreFailded = !!options?.ignoreFailded;

		const prismaEntities = await prismaClient.articleReference.findMany({
			where: { failedToSend: ignoreFailded ? false : undefined },
			take: quantity.value,
		});

		return prismaEntities.map(
			(prismaEntity) => EntityHandler.unsafeMapper(
				ArticleReferenceEntity,
				prismaEntity,
			),
		);
	},
	async delete(articleReference) {
		await prismaClient.articleReference.delete({
			where: {
				id: {
					provider: articleReference.provider.value,
					value: articleReference.value.value,
				},
			},
		});
	},
};
