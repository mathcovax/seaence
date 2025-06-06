import { reportingBakedDocumentTranslationPage } from "@/domains/reporting/reportingBakedDocumentTranslation/router";
import {
	reportingBakedDocumentTranslationListPage,
} from "@/domains/reporting/reportingBakedDocumentTranslationList/router";

export const FRfr = {
	page: {
		[reportingBakedDocumentTranslationListPage.name]: {
			bakedDocumentId: "Id du document cuit:",
			title: "Titre du document cuit:",
			reporting: "Quantités de signalment:",
			reportingDocument: "Quantités de document signalé: {0}",
		},
		[reportingBakedDocumentTranslationPage.name]: {
			bakedDocument: {
				id: "Id:",
				title: "Titre:",
				nodeId: "Id du neux:",
				language: "Langue:",
				keyword: "Mots cléfs:",
				abstract: "Abstract:",
				abstractDetails: "Abstract détailés:",
				abstractPart: "{0}: {1}",
			},
			reporting: {
				id: "Id:",
				userId: "Id du user:",
				details: "Détails:",
				quantity: "Quantités de signalment: {0}",
			},
			dialog: {
				ctaTrigger: "Faire une re-traduction",
				loading: "Chargement de la traduction en cours.",
				ctaSubmit: "Valider la nouvel traduction",
			},
		},
	},
	formMessage: {
		required: "Champ obligatoire.",
		positive: "Doit être un nombre positif.",
		max: "Ne doit pas dépasser {value}.",
		min: "Doit faire au moins {value}.",
		maxLength: "Doit faire au plus {value} caractères.",
		minLength: "Doit faire au moins {value} caractères.",
		invalidEmail: "Cet email est invalide.",
		minAge: "Vous devez avoir au moins {value} ans.",
		maxItems: "Vous pouvez au maximum avoir {value} éléments.",
		blobToLarge: "L'image est supérieure à {value} Mo.",
		minItems: "Vous devez au minimum avoir {value} éléments.",
		url: "Doit être sous la forme /path/to/page",
		minDate: "Doit être après le {value}.",
		int: "Le nombre doit être un entier.",
	},
	cta: {
		backHome: "Retour à l'accueil",
		connection: "Inscription / Connexion",
		explore: "Explorer",
		search: "Rechercher",
		send: "Envoyer",
		seeMore: "Voir plus",
	},
	responses: {
		bakedDocument: {
			notfound: "Le document cuit na pas étais trouver.",
			makeNewTranslation: "La traduction a Correctement étais mit a jours.",
		},
		nodeSameRawDocument: {
			notfound: "Le neux na pas étais trouvais.",
		},
	},
};
