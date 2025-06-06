import type {
	ArticleType,
	Facet,
	GenderFacetValue,
	SpeciesFacetValue,
} from "@vendors/clients-type/horizon/duplojsTypesCodegen";
import type { TextFieldEnumValue, YearFieldEnumValue } from "@vendors/types-advanced-query";

export const FRfr = {
	page: {
		[homePage.name]: {
			hero: {
				title: {
					begin: "L’exploration de",
					spanBlue: "documents",
					middle: "est devenue plus",
					spanRed: "agréable",
					end: "que jamais.",
				},
				subtitle: `Plongez dans le domaine de l'information avec une joie retrouvée
				en parcourant les documents sans effort. Découvrez une multitude d'informations
				et tirez le meilleur parti de votre exploration, transformant chaque recherche
				en un délicieux voyage de découverte.`,
			},
			about: {
				title: "À propos",
				content: `Seaence est une plateforme de recherche de documents qui vous permet de
				trouver des documents de recherche, des articles, des thèses, des livres
				et bien plus encore. Nous avons pour mission de rendre la recherche de
				documents plus agréable et plus efficace.`,
			},
			faq: {
				title: "Question fréquemment posées",
				accordion: {
					item1: {
						question: "Comment puis-je m'inscrire ?",
						answer:
							"Pour vous inscrire, vous devez cliquer sur le bouton \"S'inscrire\" "
							+ "en haut à droite de la page d'accueil.",
					},
					item2: {
						question: "Comment puis-je me connecter ?",
						answer:
							"Pour vous connecter, vous devez cliquer sur le bouton \"Se connecter\" "
							+ "en haut à droite de la page d'accueil.",
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
			download: "Télécharger l'article",
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
		},
		[postListPage.name]: {
			titleLinkPost: "Post(s) lié(s) au document : {title}",
			authorIs: "Posté par {author}",
			responseCount: "{count} réponse(s)",
			noPost: "Aucun post(s) trouvé pour ce document.",
			createPost: "Créer un poste",
		},
		[postPage.name]: {
			connexionRequire: "Il est obligatoire d'être connecté avant d'écrire un message.",
			backToPostList: "Retour à la liste des posts",
			countResponse: "{count}/{totalCount} Réponse(s)",
			authorIs: "Posté par {author}",
			noResponse: "Aucune réponse(s) pour ce post.",
			writeAnAnswer: "Écrivez un commentaire",
			writeYourAnswer: "Un super commentaire...",
		},
		[profilePage.name]: {
			personalInfo: {
				title: "Informations personnelles",
				label: {
					username: "Nom d'utilisateur",
					email: "Email",
				},
			},
			tab: {
				favorite: {
					title: "Mes favoris",
					empty: "Aucun favoris trouvé.",
					emptyDesc: "Ajoutez des documents à vos favoris pour les retrouver facilement.",
				},
				post: {
					title: "Mes posts",
					empty: "Vous n'avez encore rien posté",
					emptyDesc: "Partagez vos avis avec la communauté.",
				},
			},
		},
		[notFoundPage.name]: {
			title: "404 - Page non trouvée",
			subtitle: "Désolé, la page que vous recherchez n'existe pas.",
		},
		[postCreatePage.name]: {
			title: "Posez une question",
			connexionRequire: "Il est obligatoire d'être connecté avant de créer un post.",
			form: {
				topic: {
					label: {
						value: "Titre",
						infos: "(soyez clair et précis)",
					},
					placeholder: "Exemple : Comment interpréter les données du graphique page 5 ?",
					writingHelp: `Résumez le problème de manière concise.
					Soyez spécifique pour augmenter les chances d’obtenir une réponse utile.`,
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
			noNotification: "Aucune notification trouvé.",
		},
	},
	authDialog: {
		title: "Authtification",
		subtitle: "Connectez-vous ou inscrivez-vous avec Google.",
		googleSignError: "Une erreur c'est produite lors de la connexion avec google.",
		registerForm: {
			usernameLabel: "Nom utilisateur",
			CGULabel: "Accepter les contion général d'utilisation.",
			requireCGU: "L'acceptation des condition général d'utilisation est obligatoire.",
		},
	},
	layout: {
		base: {
			header: {
				link: {
					search: "Recherche",
					simple: "Simple",
					advanced: "Avancée",
				},
				accountDropdown: {
					title: "Mon compte",
					profile: "Mon profil",
					disconnect: "Se déconnecter",
					notification: "Notifications",
				},
			},
			footer: {
				nav: {
					conditions: "Conditions d'utilisation",
					about: "À propos",
					support: "Support",
				},
			},
		},
		loader: {
			title: "Chargement...",
		},
	},
	search: {
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
						abstract: "Abstract",
						title: "Titre",
					} satisfies Record<TextFieldEnumValue, string>,
				},
				year: {
					selectPlaceholder: "Sélectionner un champ",
					label: "Comparaison d'années",
					fields: {
						allDate: "Toutes Dates",
						journalDate: "publication journal",
						webDate: "publication web",
					} satisfies Record<YearFieldEnumValue, string>,
				},
			},
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
		foundResults: "{count} résultat(s) trouvé(s)",
		noResult: "Aucun résultat trouvé",
	},
	post: {
		authorIs: "",
		responseCount: "",
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
		save: "Enregistrer",
		register: "Créée un compte",
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
			alreadyExist: "Un utilisateur avec cette address eùail éxiste déjà.",
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
		SERVER_ERROR: "Veuillez nous excuser, une erreur serveur s'est produite.",
	},
	notification: {
		register: {
			content: "Bienvenue sur Seance !",
		},
		replyToPost: {
			repliedToYourPostMessage: "a répondu à votre publication",
		},
		status: "Nouveau",
	},
};
