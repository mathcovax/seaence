import { dashboardPage } from "@/domains/dashboard/dashboardPage/router";
import { postPage } from "@/domains/post/postModeration/router";
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
			rejectModal: {
				title: "Motif de rejet",
				reason: {
					title: "Raison du rejet",
					placeholder: "Sélectionnez une raison",
					choices: {
						spam: "Contenu spam ou publicitaire",
						inappropriate: "Contenu inapproprié",
						offTopic: "Hors sujet",
						duplicate: "Contenu dupliqué",
						lowQuality: "Qualité insuffisante",
						other: "Autre raison",
					},
				},
				action: {
					title: "Action à effectuer",
					type: {
						warning: "Avertissement simple",
						block: "Bloquer l'accès aux posts",
					},
				},

				confirm: "Confirmer le rejet",
			},
			postStats: {
				pending: "Posts en attente",
				approved: "Posts approuvés",
				rejected: "Posts rejetés",
			},
		},
		[reportingBakedDocumentTranslationListPage.name]: {
			title: "Liste des documents traduits",
			reportingDocument: "Nombre de document(s) signalé(s) : {0}",
			emptyTitle: "Aucun document signalé",
			emptyDescription: "Il n'y a actuellement aucun document avec des signalements de traduction.",
			reporting: "Nombre de signalement(s) :",
		},
		[reportingBakedDocumentTranslationPage.name]: {
			title: "Signalements de traduction",
			description: "Gérez les signalements de documents traduits et leurs corrections.",
			bakedDocument: {
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
		post: {
			notfound: "Le post n'a pas été trouvé.",
			wrongStatus: "Le post n'est pas en attente de modération.",
			updated: "Le post a été mis à jour avec succès.",
		},
	},
};
