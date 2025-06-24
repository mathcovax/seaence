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
			reportingWrongTranslate: {
				connexionRequire: "Il est obligatoire d'être connecté avant d'écrire un message.",
				cta: "Signaler un problème de traduction du document.",
				information: [
					"La tarduction est faite pars un model machine learning généric, cela",
					"implique que certain mots n'arrive pas a étre traduit. Signaler une mauvaise traduction",
					"nous permer d'amélioré le model et donc d'amélioré votre expérience utilisateur de seance.",
				].join(" "),
				form: {
					textareaLabel: "Détails du probléme de traduction.",
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
			writeAnAnswerDescription: "Partagez votre avis ou répondez à la question posée.",
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
			title: "Créer un post",
			description: "Posez une question ou partagez votre avis sur un document.",
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
		[documentFolderPage.name]: {
			title: "Dossiers",
			form: {
				label: {
					name: "Nom du dossier",
				},
			},
			dialog: {
				createDocumentFolder: {
					title: "Créer un dossier",
				},
			},
			header: {
				label: "dossiers",
			},
			noDocumentFolder: "Aucun dossier trouvé.",
		},
		[documentInFolderPage.name]: {
			title: "Dossier",
			header: {
				label: "documents",
			},
			noDocumentInFolder: "Aucun document trouvé.",
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
	removeDocumentFolderDialog: {
		title: "Supprimer un dossier",
		description: "Êtes-vous sur de vouloir supprimer ce dossier ? La suppression dossier supprimera également son contenu",
	},
	documentFolderHeader: {
		filtered: "{filtered} sur {total}",
	},
	createManyDocumentInFolderDialog: {
		title: "Ajouter le document",
		form: {
			label: {
				name: "libellé",
				folder: "dossiers",
			},
			placeholder: {
				name: "Entrer un nom de document",
				folder: "Sélectionner des dossiers",
			},
			emptyLabel: {
				folder: "Aucun dossier trouvé.",
			},
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
					documentFolder: "Dossiers",
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
						keywords: "Mots clef",
					} satisfies Record<TextFieldEnumValue, string>,
				},
				strictText: {
					selectPlaceholder: "Sélectionner un champ",
					inputPlaceholder: "Entrer une valeur",
					label: "Comparaison textuelle strict",
					fields: {
						allField: "Tous les champs",
						abstract: "Abstract",
						title: "Titre",
						keywords: "Mots clef",
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
					label: "Comparaison de platforme",
					selectPlaceholder: "Sélectionner une platforme",
					emptyLabel: "Platforme non trouvé",
					value: {
						pubmed: "PubMed",
					} satisfies Record<ProviderEnumValue, string>,
				},
				yearInterval: {
					selectPlaceholder: "Sélectionner un champ",
					label: "Comparaison d'années avec interval",
					refineMessage: "La veleur du premier champ doit étre supérieur au deuxiéme.",
					fields: {
						allDate: "Toutes Dates",
						journalDate: "publication journal",
						webDate: "publication web",
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
		foundResults: "{count} résultat(s) trouvé(s)",
		noResult: "Aucun résultat trouvé",
	},
	documentRowResult: {
		searchScore: "Score de recherche: {0}",
	},
	favoriteEquation: {
		connexionRequire: "Voud devez étre connecter pour ajouter des équation en favorit.",
		needEquation: "Il n'est pas possible d'enregister une équation vide.",
		emptySearch: "Aucune equation favorite trouver.",
		inputLabel: "Rechercher ou nommer",
		remove: "Supprimer l'equation des favorit ?",
		replace: "Une équation avec ce nom éxiste déjà, voulez vous la remplacer ?",
		invalidEquation: "L'equation que vous voulez utilisé a un ou plusieur champ "
		+ "invalide, ésiter pas a faire une recherche avec pour s'assuré qu'elle fonctionne correctement.",

	},
	post: {
		authorIs: "",
		responseCount: "",
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
		explore: "Explorer",
		search: "Rechercher",
		send: "Envoyer",
		seeMore: "Voir plus",
		save: "Enregistrer",
		remove: "Supprimer",
		no: "Non",
		replace: "Remplacer",
		register: "Créer un compte",
		connection: "Inscription / Connexion",
		delete: "Supprimer",
		create: "Créer",
		validate: "Valider",
		refuse: "Refuser",
		add: "Ajouter",
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
			banned: "L'action que vous southais faire vous est interdit a cause d'un banisement.",
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
			upsert: "Le signalement a corectement étais pris en compte, merci de votre contribution.",
		},
		favoriteEquation: {
			upsert: "L'équation a bien étais mise dans les favorit.",
			remove: "l'équation a bien étais supprimer.",
		},
		SERVER_ERROR: "Veuillez nous excuser, une erreur serveur s'est produite.",
	},
};
