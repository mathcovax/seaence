import { dashboardPage } from "@/domains/dashboard/dashboardPage/router";
import { answerPage } from "@/domains/forum/answerModeration/router";
import { postPage } from "@/domains/forum/postModeration/router";
import { reportingBakedDocumentTranslationPage } from "@/domains/reporting/reportingBakedDocumentTranslation/router";
import {
	reportingBakedDocumentTranslationListPage,
} from "@/domains/reporting/reportingBakedDocumentTranslationList/router";

export const FRfr = {
	page: {
		[dashboardPage.name]: {
			title: "Tableau de bord",
			description: "Bienvenue sur votre tableau de bord.",
			status: {
				title: "État des services",
				up: "En ligne",
				down: "Hors ligne",
			},
			modules: {
				title: "Modules d'administration",
				post: {
					title: "Modération des Posts",
					description: "Examinez et modérez les posts en attente de validation.",
				},
				answer: {
					title: "Modération des Réponses",
					description: "Examinez et modérez les réponses en attente de validation.",
				},
				reportingBakedDocumentTranslation: {
					title: "Signalements de Traduction",
					description: "Gérez les signalements de documents traduits et leurs corrections.",
				},
			},
		},
		[postPage.name]: {
			title: "Modération des Posts",
			description: "Examinez et modérez les posts en attente de validation.",
			emptyTitle: "Aucun post en attente",
			emptyDescription: "Il n'y a actuellement aucun post en attente de modération.",
			postStatus: "En attente",
			isProcessing: "Traitement en cours...",
			warningModal: {
				title: "Avertisement utilisateur :",
				checkboxBanUser: "Bannir l'utilisateur ?",
				reasonLabel: "Raison de l'avertisement",
				confirm: "Confirmer le rejet",
			},
			postStats: {
				pending: "Posts en attente",
				approved: "Posts approuvés",
				rejected: "Posts rejetés",
			},
		},
		[answerPage.name]: {
			title: "Modération des Réponses",
			description: "Examinez et modérez les réponses en attente de validation.",
			emptyTitle: "Aucune réponse en attente",
			emptyDescription: "Il n'y a actuellement aucune réponse en attente de modération.",
			answerStatus: "En attente",
			warningModal: {
				title: "Avertisement utilisateur :",
				checkboxBanUser: "Bannir l'utilisateur ?",
				reasonLabel: "Raison de l'avertisement",
				confirm: "Confirmer le rejet",
			},
			answerStats: {
				pending: "Réponses en attente",
				approved: "Réponses approuvées",
				rejected: "Réponses rejetées",
			},
		},
		[reportingBakedDocumentTranslationListPage.name]: {
			title: "Liste des documents traduits",
			reportingDocument: "Nombre de document(s) signalé(s) : {0}",
			emptyTitle: "Aucun document signalé",
			emptyDescription: "Il n'y a actuellement aucun document avec des signalements de traduction.",
			reporting: "Nombre de signalement(s) :",
			missingBakedDocumentTitle: "Titre du document manquant.",
		},
		[reportingBakedDocumentTranslationPage.name]: {
			title: "Signalements de traduction",
			description: "Gérez les signalements de documents traduits et leurs corrections.",
			seeDocument: "Voir le document",
			errorWhenFetchingNewVersion: "Une erreur est survenu lors de la traduction du document.",
			bakedDocument: {
				cookingMode: "Mode de cuisson",
				title: "Document traduit",
				id: "Identifiant",
				nodeId: "ID du nœud",
				language: "Langue",
				keyword: "Mots-clés",
				abstract: "Résumé",
				abstractDetails: "Détails du résumé",
				abstractPart: "{0}: {1}",
			},
			reporting: {
				title: "Signalements",
				id: "Identifiant",
				userId: "ID de l'utilisateur",
				details: "Détails",
				quantity: "{0} signalement(s)",
				empty: "Aucun signalement trouvé",
			},
			dialog: {
				ctaTrigger: "Retraduire le document",
				loading: "Génération de la nouvelle traduction en cours...",
				ctaSubmit: "Valider la nouvelle traduction",
			},
		},
	},
	post: {
		deletedAuthors: "Auteur supprimé",
	},
	layout: {
		loader: {
			title: "Chargement en cours...",
		},
		footer: {
			nav: {
				dashboard: "Tableau de bord",
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
		maxItems: "Vous pouvez au maximum avoir {value} éléments.",
		minItems: "Vous devez au minimum avoir {value} éléments.",
		url: "Doit être sous la forme /path/to/page",
		minDate: "Doit être après le {value}.",
		int: "Le nombre doit être un entier.",
	},
	cta: {
		back: "Retour",
		search: "Rechercher",
		send: "Envoyer",
		cancel: "Annuler",
		approuve: "Approuver",
		reject: "Rejeter",
		seeMore: "Voir plus",
	},
	responses: {
		bakedDocument: {
			notfound: "Le document traduit n'a pas été trouvé.",
			makeNewTranslation: "La traduction a été correctement mise à jour.",
		},
		nodeSameRawDocument: {
			notfound: "Le nœud n'a pas été trouvé.",
		},
		answer: {
			notfound: "La réponse n'a pas été trouvée.",
			wrongStatus: "La réponse n'est pas en attente de modération.",
			updated: "La réponse a été mise à jour avec succès.",
			postMismatch: "La réponse ne correspond pas au post.",
		},
		post: {
			notfound: "Le post n'a pas été trouvé.",
			wrongStatus: "Le post n'est pas en attente de modération.",
			updated: "Le post a été mis à jour avec succès.",
		},
		SERVER_ERROR: "Veuillez nous excuser, une erreur serveur s'est produite.",
	},
};
