/* eslint-disable vue/max-len */
import type {
	ArticleType,
	Facet,
	GenderFacetValue,
	SpeciesFacetValue,
} from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import type {
	Comparator,
	ProviderEnumValue,
	TextFieldEnumValue,
	YearFieldEnumValue,
} from "@vendors/types-advanced-query";
import { cguFRfr } from "./cgu/FR-fr";
import { scratchTutorialFRfr } from "./tutorial/Fr-fr";

export const FRfr = {
	page: {
		[homePage.name]: {
			hero: {
				title: {
					base: "Explorez la {one} avec une approche {two} et {three}.",
					one: "recherche scientifique",
					two: "collaborative",
					three: "intelligente",
				},
				subtitle: "Découvrez une plateforme de recherche documentaire moderne qui combine recherche avancée, traduction de document, forum communautaire et outils d'organisation. Transformez votre façon d'explorer la littérature scientifique.",
			},
			about: {
				title: "À propos de Seaence",
				content: `Seaence est une plateforme de recherche documentaire scientifique de nouvelle génération. 
                Nous centralisons et indexons des données provenant de multiples sources dans une base vectorielle, 
				offrant des capacités de recherche avancées. Notre mission est de faire évoluer l'accès à l'information scientifique.`,
			},
			features: {
				title: "Fonctionnalités principales",
				items: {
					search: {
						title: "Recherche avancées",
						description: "Recherche vectorielle avec filtres avancés, sur des documents traduits dans plusieurs langues.",
					},
					forum: {
						title: "Forum communautaire",
						description: "Échangez avec la caummunauté, posez des questions et partagez vos découvertes.",
					},
					organization: {
						title: "Organisation personnalisée",
						description: "Créez vos dossiers pour sauvegarder des documents que vous souhaitez retrouver.",
					},
				},
			},
			faq: {
				title: "Questions fréquemment posées",
				accordion: {
					item1: {
						question: "Pourquoi « Seaence » ?",
						answer: "Le nom est un jeu de mots avec « sea » signifiant l'océan et « science ». La combinaison des deux (Seaence) illustre l'océan de savoir sur lequel vous allez naviguer.",
					},
					item2: {
						question: "Quelles sont les motivations du projet ?",
						answer:
							`Seaence est avant tout un projet de fin d'étude. Cependant, nous avons travaillé avec la volonté de 
							faire vivre ce projet au-delà de notre fin de cursus. À terme, nous souhaitons proposer encore plus 
							de solutions intelligentes pour simplifier au maximum l'accès à la connaissance. Avec la 
							multiplication des bases de données, chacune ayant leur propre système de recherche pensé pour des personnes 
							qui connaissent déjà le sujet, il nous paraît essentiel de tout centraliser. Comme ça, plus d'excuse pour 
							ne pas faire de la veille !`,
					},
					item3: {
						question: "Où et comment sont trouvées nos ressources ?",
						answer:
							`Aujourd'hui, nous trouvons nos données principalement sur PubMed grâce à leur API mise à disposition. 
							Plus tard, nous indexerons plus de bases de données comme PEDro et ScienceDirect. Cela permettra 
							d'avoir la même expérience de recherche pour toutes les bases que nous indexerons.`,
					},
					item4: {
						question: "À quoi ça sert de se créer un compte ?",
						answer:
							`Cela vous donne accès à des fonctionnalités supplémentaires comme la possibilité de participer au forum 
							sur les documents. Vous pourrez également créer des dossiers pour enregistrer des documents que vous 
							voulez sauvegarder.`,
					},
				},
			},
		},
		[simpleSearchPage.name]: {
			searchInput: {
				placeholder: "Rechercher...",
			},
		},
		[advancedSearchPage.name]: {
			maxSizeRequest: "L'équation est trop grande.",
		},
		[documentPage.name]: {
			label: {
				articleType: "Type d'article",
				keywords: "Mots clés",
				institutions: "Institutions",
				ressources: "Ressources",
				abstract: "Abstract",
				linkedPosts: "Posts liés",
			},
			createPost: "Créer un poste",
			noPost: "Aucun post(s) trouvé pour ce document.",
			reportingWrongTranslate: {
				connexionRequire: "Vous devez être connecté pour signaler un problème de traduction.",
				cta: "Signaler un problème de traduction du document",
				information: [
					"La traduction est effectuée par un modèle de machine learning générique, cela",
					"implique que certains mots peuvent être mal traduits. Signaler une mauvaise traduction",
					"nous permet d'améliorer le modèle et donc d'améliorer votre expérience utilisateur sur Seaence.",
				].join(" "),
				form: {
					textareaLabel: "Détails du problème de traduction.",
				},
			},
			createManyDocumentInFolderDialog: {
				button: {
					content: "Ajouter dans un dossier",
				},
			},
		},
		[postListPage.name]: {
			titleLinkPost: "Post(s) lié(s) au document : {title}",
			authorIs: "Posté par {author}",
			responseCount: "{count} réponse(s)",
			noPost: "Aucun post trouvé pour ce document.",
			createPost: "Créer un post",
		},
		[postPage.name]: {
			connexionRequire: "Vous devez être connecté pour répondre à ce post.",
			backToPostList: "Retour à la liste des posts",
			countResponse: "{count}/{totalCount} Réponse(s)",
			authorIs: "Posté par {author}",
			noResponse: "Aucune réponse pour ce post.",
			writeAnAnswer: "Écrivez un commentaire",
			writeAnAnswerDescription: "Partagez votre avis ou répondez à la question posée.",
			writeYourAnswer: "Un super commentaire...",
			notCompliantContent: "Le contenu de ce message a été censuré.",
		},
		[profilePage.name]: {
			personalInfo: {
				title: "Informations personnelles",
				label: {
					username: "Nom d'utilisateur",
					email: "Email",
				},
			},
			deleteAccount: {
				dialog: {
					title: "Supprimer votre compte ?",
					description: "Supprimer votre compte entraînera la perte de toutes vos données et l'anonymisation complète du compte sur la plateforme.",
				},
				button: "Supprimer mon compte",
			},
		},
		[notFoundPage.name]: {
			title: "404 - Page non trouvée",
			subtitle: "Désolé, la page que vous recherchez n'existe pas.",
		},
		[postCreatePage.name]: {
			title: "Créer un post",
			description: "Posez une question ou partagez votre avis sur un document.",
			connexionRequire: "Vous devez être connecté pour créer un post.",
			form: {
				topic: {
					label: {
						value: "Titre",
						infos: "(soyez clair et précis)",
					},
					placeholder: "Exemple : Comment interpréter les données du graphique page 5 ?",
					writingHelp: `Résumez le problème de manière concise.
					Plus vous serez précis, plus vous aurez de chances d'obtenir une réponse pertinente.`,
				},
				content: {
					label: "Détaillez votre question",
					placeholder:
						"Expliquez ce que vous essayez de comprendre, ce que vous avez tenté, "
						+ "et sur quelle partie du document vous avez un doute.",
					writingHelps: {
						one: "Expliquez le contexte du document (ex : chapitre, thème, graphique concerné...)",
						two: "Dites ce que vous avez compris ou tenté",
						three: "Posez une seule question claire par post si possible",
					},
					errors: {
						minLength: "Le contenu doit faire au moins {value} caractères.",
						maxLength: "Le contenu doit faire au plus {value} caractères.",
					},
				},
				submitBtn: "Publier ma question",
			},
		},
		[notificationListPage.name]: {
			title: "Notifications",
			noNotification: "Aucune notification trouvée.",
		},
		[documentFolderPage.name]: {
			title: "Dossiers",
			noDocumentFolder: "Aucun dossier trouvé.",
			searchPlaceholder: "Rechercher un dossier...",
			renameDialog: {
				title: "Renomer le dossier",
				label: "Nom",
			},
			removeDialog: {
				title: "Supprimer un dossier",
				description: "Êtes-vous sûr de vouloir supprimer ce dossier ? La suppression du dossier sera irréversible.",
			},
		},
		[documentInFolderPage.name]: {
			title: "Dossier : {title}",
			noDocumentInFolder: "Aucun document trouvé.",
			searchPlaceholder: "Rechercher un document...",
			bakedDocumentTitle: "Titre du document: {0}",
			missingBakedDocumentTitle: "Titre du document manquant.",
			renameDialog: {
				title: "Renomer le document.",
				label: "Nom",
			},
			removeDialog: {
				title: "Supprimer un document",
				description: "Êtes-vous sûr de vouloir supprimer ce document ? La suppression du document sera irréversible.",
			},
		},
		...cguFRfr,
		...scratchTutorialFRfr,
	},
	authDialog: {
		title: "Authentification",
		subtitle: "Connectez-vous ou inscrivez-vous avec Google.",
		googleSignError: "Une erreur s'est produite lors de la connexion avec Google.",
		registerForm: {
			usernameLabel: "Nom d'utilisateur",
			CGULabel: "J’accepte les {0}",
			CGULinkText: "Conditions Générales d’Utilisation",
			requireCGU: "Vous devez accepter conditions générales d'utilisation.",
		},
	},
	createDocumentFolderDialog: {
		title: "Créer un dossier",
		label: "Nom",
	},
	documentFolderHeader: {
		label: "{count} élément(s)",
		filtered: "{filtered} sur {total}",
		noFiltered: "Aucun élément trouvé",
	},
	documentInFolderForm: {
		name: "Nom du document",
	},
	createManyDocumentInFolderDialog: {
		title: "Ajouter le document",
		sectionLabel: "Se trouve déjà dans :",
		form: {
			label: {
				name: "Libellé",
				folder: "Dossiers",
			},
			placeholder: {
				name: "Entrer un nom de document",
				folder: "Sélectionner des dossiers",
			},
			emptyLabel: {
				folder: "Aucun dossier trouvé.",
			},
		},
		noParentFolder: "Ce document n'est associé à aucun dossier.",
		createDocumentFolder: "Créer un dossier",
		createdMessage: "Le document a été ajouté dans le(s) dossier(s)",
		createdMessageWithError: "Le document a été ajouté à certains dossiers, cependant il y a eu {foundError} dossier(s) non trouvé(s) et {capacityError} dossier(s) plein(s).",

	},
	documentFolderCard: {
		items: "{count} document(s)",
	},
	layout: {
		base: {
			header: {
				link: {
					search: "Recherche",
					simple: "Simple",
					advanced: "Avancée",
					tutorial: "Tutoriel",
				},
				accountDropdown: {
					title: "Mon compte",
					profile: "Mon profil",
					disconnect: "Se déconnecter",
					notification: "Notifications",
					documentFolder: "Dossiers",
				},
			},
			footer: {
				nav: {
					conditions: "Conditions générales d'utilisation",
					discord: "Discord communautaire",
				},
			},
		},
		loader: {
			title: "Chargement...",
		},
	},
	search: {
		failedToFetch: "Une erreur est survenue lors de la recherche, veuillez réessayer.",
		filters: {
			showFilters: "Afficher les filtres",
			hideFilters: "Masquer les filtres",
			showScratch: "Afficher l'équation",
			hideScratch: "Masquer l'équation",
			label: {
				articleType: "Type d'article",
				publicationYear: "Année de publication",
				gender: "Sexe",
			},
			apply: "Appliquer les filtres",
			reset: "Réinitialiser les filtres",
			multiSelect: {
				articleType: {
					placeholder: "Sélectionnez un type d'article",
					emptyLabel: "Type d'article non trouvé",
				},
			},
		},
		facet: {
			gender: {
				label: "Genre",
				values: {
					male: "Homme",
					female: "Femme",
				} satisfies Record<GenderFacetValue, string>,
			},
			species: {
				label: "Espèce",
				values: {
					human: "Humain",
					otherAnimal: "Autres Animaux",
				} satisfies Record<SpeciesFacetValue, string>,
			},
			articleType: {
				label: "Type d'article",
				get valueLabel() {
					return FRfr.articleType;
				},
			},
			year: { label: "Année" },
		} satisfies Record<Facet["name"], object>,
		scratch: {
			title: "Recherche avancée",
			reset: "Réinitialiser",
			hide: "Masquer le scratch",
			show: "Afficher le scratch",
			tabs: {
				comparator: "Comparateur",
				operator: "Opérateur",
			},
			comparator: {
				text: {
					selectPlaceholder: "Sélectionner un champ",
					inputPlaceholder: "Entrer une valeur",
					label: "Comparaison textuelle",
					fields: {
						allField: "Tous les champs",
						abstract: "Résumé",
						title: "Titre",
						keywords: "Mots-clés",
					} satisfies Record<TextFieldEnumValue, string>,
				},
				strictText: {
					selectPlaceholder: "Sélectionner un champ",
					inputPlaceholder: "Entrer une valeur",
					label: "Comparaison textuelle stricte",
					fields: {
						allField: "Tous les champs",
						abstract: "Résumé",
						title: "Titre",
						keywords: "Mots-clés",
					} satisfies Record<TextFieldEnumValue, string>,
				},
				year: {
					selectPlaceholder: "Sélectionner un champ",
					label: "Comparaison d'années",
					fields: {
						allDate: "Toutes les dates",
						journalDate: "Publication journal",
						webDate: "Publication web",
					} satisfies Record<YearFieldEnumValue, string>,
				},
				author: {
					inputPlaceholder: "Entrer une valeur",
					label: "Comparaison d'auteur",
				},
				articleType: {
					label: "Comparaison de type d'article",
					selectPlaceholder: "Sélectionner un type d'article",
					emptyLabel: "Type d'article non trouvé",
				},
				provider: {
					label: "Comparaison de plateforme",
					selectPlaceholder: "Sélectionner une plateforme",
					emptyLabel: "Plateforme non trouvée",
					value: {
						pubmed: "PubMed",
					} satisfies Record<ProviderEnumValue, string>,
				},
				yearInterval: {
					selectPlaceholder: "Sélectionner un champ",
					label: "Comparaison d'années avec intervalle",
					refineMessage: "La valeur du premier champ doit être supérieure à celle du deuxième.",
					fields: {
						allDate: "Toutes les dates",
						journalDate: "Publication journal",
						webDate: "Publication web",
					} satisfies Record<YearFieldEnumValue, string>,
				},
			} satisfies Record<Comparator["name"], object>,
			operator: {
				and: {
					label: "ET",
				},
				or: {
					label: "OU",
				},
				not: {
					label: "NON",
				},
			},
		},
		boost: {
			low: "Boost faible",
			medium: "Boost moyen",
			high: "Boost élevé",
		},
		foundResults: "{count} résultat(s) trouvé(s)",
		foundMoreThan2000Results: "Plus de 2000 résultat trouvés",
		noResult: "Aucun résultat trouvé",
	},
	documentRowResult: {
		searchScore: "Score de recherche: {0}",
	},
	favoriteEquation: {
		connexionRequire: "Vous devez être connecté pour ajouter des équations aux favoris.",
		needEquation: "Il n'est pas possible d'enregistrer une équation vide.",
		emptySearch: "Aucune équation favorite trouvée.",
		saveEquation: "Enregistrer l'équation",
		savedEquations: "Équations enregistrées",
		inputLabel: "Rechercher ou nommer",
		remove: "Supprimer l'équation des favoris ?",
		replace: "Une équation avec ce nom existe déjà, voulez-vous la remplacer ?",
		invalidEquation: "L'équation que vous voulez utiliser possède un ou plusieurs champs "
		+ "invalides. N'hésitez pas à faire une recherche avec pour vous assurer qu'elle fonctionne correctement.",
		found: "Équation trouvée",
		addToFavorites: "Ajouter aux favoris",
		confirmRemove: "Supprimer '{name}' des favoris ?",
		noSavedEquations: "Aucune équation sauvegardée",
		saveFirstEquation: "Sauvegardez votre première équation de recherche",
	},
	post: {
		deletedAuthors: "Auteur supprimé",
	},
	notification: {
		status: "Nouveau",
		register: {
			content: "Bienvenue sur Seance !",
		},
		replyToPost: {
			repliedToYourPostMessage: "a répondu à votre publication",
		},
		answer: {
			ban: "Publication de réponses suspendu, vous ne pouvez plus répondre aux posts pour le moment",
			warning: "Votre réponse a reçu un avertissement",
		},
		post: {
			ban: "Publication de post suspendu, vous ne pouvez plus poster pour le moment",
			warning: "Votre post a reçu un avertissement",
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
		minItems: "Vous devez au minimum avoir {value} éléments.",
		blobToLarge: "L'image est supérieure à {value} Mo.",
		url: "Doit être sous la forme /path/to/page",
		minDate: "Doit être après le {value}.",
		int: "Le nombre doit être un entier.",
	},
	cta: {
		backHome: "Retour à l'accueil",
		explore: "Explorer",
		search: "Rechercher",
		send: "Envoyer",
		seeMore: "Voir plus",
		save: "Enregistrer",
		remove: "Supprimer",
		no: "Non",
		yes: "Oui",
		replace: "Remplacer",
		register: "Créer un compte",
		connection: "Inscription / Connexion",
		delete: "Supprimer",
		create: "Créer",
		validate: "Valider",
		refuse: "Refuser",
		add: "Ajouter",
		rename: "Renommer",
		cancel: "Annuler",
	},
	languages: {
		"fr-FR": "Français",
		"en-US": "English",
	},
	articleType: {
		adaptiveClinicalTrial: "Essai clinique adaptatif",
		address: "Adresse",
		autobiography: "Autobiographie",
		bibliography: "Bibliographie",
		biography: "Biographie",
		booksAndDocuments: "Livres et documents",
		caseReports: "Rapports de cas",
		classicalArticle: "Article classique",
		clinicalConference: "Conférence clinique",
		clinicalStudy: "Étude clinique",
		clinicalTrial: "Essai clinique",
		clinicalTrialProtocol: "Protocole d'essai clinique",
		clinicalTrialPhaseI: "Essai clinique phase I",
		clinicalTrialPhaseII: "Essai clinique phase II",
		clinicalTrialPhaseIII: "Essai clinique phase III",
		clinicalTrialPhaseIV: "Essai clinique phase IV",
		clinicalTrialVeterinary: "Essai clinique vétérinaire",
		collectedWork: "Travail collectif",
		comment: "Commentaire",
		comparativeStudy: "Étude comparative",
		congress: "Congrès",
		consensusDevelopmentConference: "Conférence de consensus",
		consensusDevelopmentConferenceNIH: "Conférence de consensus NIH",
		controlledClinicalTrial: "Essai clinique contrôlé",
		correctedAndRepublishedArticle: "Article corrigé et republié",
		dataset: "Jeu de données",
		dictionary: "Dictionnaire",
		directory: "Répertoire",
		duplicatePublication: "Publication en double",
		editorial: "Éditorial",
		electronicSupplementaryMaterials: "Matériaux supplémentaires électroniques",
		englishAbstract: "Résumé en anglais",
		equivalenceTrial: "Essai d'équivalence",
		evaluationStudy: "Étude d'évaluation",
		expressionOfConcern: "Expression de préoccupation",
		festschrift: "Festschrift",
		governmentPublication: "Publication gouvernementale",
		guideline: "Directive",
		historicalArticle: "Article historique",
		interactiveTutorial: "Tutoriel interactif",
		interview: "Entretien",
		introductoryJournalArticle: "Article de journal introductif",
		journalArticle: "Article de journal",
		lecture: "Conférence",
		legalCase: "Affaire juridique",
		legislation: "Législation",
		letter: "Lettre",
		metaAnalysis: "Méta-analyse",
		multicenterStudy: "Étude multicentrique",
		news: "Actualités",
		newspaperArticle: "Article de journal",
		observationalStudy: "Étude observationnelle",
		observationalStudyVeterinary: "Étude observationnelle vétérinaire",
		overall: "Global",
		patientEducationHandout: "Brochure d'éducation du patient",
		periodicalIndex: "Index périodique",
		personalNarrative: "Récit personnel",
		portrait: "Portrait",
		practiceGuideline: "Guide de pratique",
		pragmaticClinicalTrial: "Essai clinique pragmatique",
		preprint: "Prépublication",
		publishedErratum: "Erratum publié",
		randomizedControlledTrial: "Essai contrôlé randomisé",
		randomizedControlledTrialVeterinary: "Essai contrôlé randomisé vétérinaire",
		researchSupportAmericanRecoveryAndReinvestmentAct: "Soutien à la recherche (ARRA)",
		researchSupportNIHExtramural: "Soutien à la recherche NIH (extramural)",
		researchSupportNIHIntramural: "Soutien à la recherche NIH (intramural)",
		researchSupportNonUSGovt: "Soutien à la recherche (hors gouvernement américain)",
		researchSupportUSGovtNonPHS: "Soutien à la recherche (gouvernement américain hors PHS)",
		researchSupportUSGovtPHS: "Soutien à la recherche (gouvernement américain PHS)",
		researchSupportUSGovt: "Soutien à la recherche (gouvernement américain)",
		retractedPublication: "Publication rétractée",
		retractionOfPublication: "Rétractation de publication",
		review: "Revue",
		scopingReview: "Revue de cadrage",
		scientificIntegrityReview: "Revue d'intégrité scientifique",
		systematicReview: "Revue systématique",
		technicalReport: "Rapport technique",
		twinStudy: "Étude sur les jumeaux",
		validationStudy: "Étude de validation",
		videoAudioMedia: "Média vidéo/audio",
		webcast: "Webcast",
	} satisfies Record<ArticleType, string>,
	responses: {
		user: {
			logged: "Connexion réalisée avec succès.",
			registered: "Création de compte réalisée avec succès.",
			notfound: "Utilisateur introuvable.",
			shortUpdatedDelay: "Vous devez attendre avant de pouvoir modifier à nouveau ces informations.",
			alreadyExist: "Un utilisateur avec cette adresse email existe déjà.",
			banned: "L'action que vous souhaitez faire vous est interdite à cause d'un bannissement.",
			deleted: "L'utilisateur a correctement été supprimé.",
			alreadyDelete: "L'utilisateur est déjà supprimé.",
			updated: "Vos informations ont bien été mises à jour.",
		},
		credential: {
			invalid: "Identifiant Google invalide.",
		},
		article: {
			notfound: "Article introuvable.",
		},
		document: {
			notfound: "Document introuvable.",
		},
		post: {
			created: "Post créé avec succès.",
			notfound: "Post introuvable.",
		},
		answer: {
			created: "Réponse créée avec succès.",
		},
		bakedDocumentTranslationReporting: {
			upsert: "Le signalement a bien été pris en compte, merci de votre contribution.",
		},
		favoriteEquation: {
			upsert: "L'équation a bien été mise en favoris.",
			remove: "L'équation a bien été supprimée.",
		},
		documentFolder: {
			alreadyExists: "Le dossier existe déjà",
			maxQuantity: "Le dossier est plein",
			notfound: "Le dossier n'existe pas",
			removed: "Le dossier a été supprimé",
			created: "Le dossier a été créé",
			noneFound: "Aucun dossier n'a été trouvé.",
			noneCapacity: "Tous les dossiers ont atteint le nombre maximal de documents qu'ils peuvent contenir.",
		},
		documentInFolder: {
			notfound: "Le document n'existe pas",
			removed: "Le document a été supprimé",
		},
		SERVER_ERROR: "Veuillez nous excuser, une erreur serveur s'est produite.",
	},
};
