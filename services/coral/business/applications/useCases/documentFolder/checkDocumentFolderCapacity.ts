import { C, E } from "@duplojs/utils";
import { DocumentFolder } from "@business/domains/entities/documentFolder";
import { documentFolderRules } from "@vendors/entity-rules";

interface Input<
	GenericDocumentFolder extends DocumentFolder.Entity,
> {
	documentFolder: GenericDocumentFolder;
}

export const CheckDocumentFolderCapacityUseCase = C.createUseCase(
	{},
	() => <
		GenericDocumentFolder extends DocumentFolder.Entity,
	>(input: Input<GenericDocumentFolder>) => {
		if (C.greaterThan(
			input.documentFolder.numberOfDocument,
			DocumentFolder.MaxCapacity,
		)) {
			return E.left(
				"quantity-of-document-in-folder-exceeding-max-capacity",
				{
					documentFolder: input.documentFolder,
					maxCapacity: documentFolderRules.maxCapacity,
				},
			);
		}

		return E.success(
			DocumentFolder.WithCheckedCapacity.append(input.documentFolder),
		);
	},
);
