import type { TextFieldEnumValue, YearFieldEnumValue } from "@vendors/scratch-type";

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
		[notFoundPage.name]: {
			title: "404 - Page non trouvée",
			subtitle: "Désolé, la page que vous recherchez n'existe pas.",
		},
		[connectionPage.name]: {
			title: "Inscription / Connexion",
			subtitle: "Connectez-vous ou inscrivez-vous avec Google.",
			googleSignError: "Une erreur c'est produite lors de la connexion avec google.",
		},
		[simpleSearchPage.name]: {
			showFilters: "Afficher les filtres",
			hideFilters: "Masquer les filtres",
			foundResults: "{count} résultat(s) trouvé(s)",
			noResults: "Aucun résultat trouvé",
		},
		[postPage.name]: {
			backToPostList: "Retour à la liste des posts",
			countResponse: "{count}/{totalCount} Réponse(s)",
			authorIs: "Posté par {author}",
			noResponse: "Aucune réponse(s) pour ce post.",
			writeAnAnswer: "Écrivez un commentaire",
		},
		[postListPage.name]: {
			titleLinkPost: "Post(s) lié au document : {title}",
			authorIs: "Posté par {author}",
			responseCount: "{count} réponse(s)",
			noPost: "Aucun post(s) trouvé pour ce document.",
		},
	},
	layout: {
		base: {
			header: {
				search: {
					tabs: {
						simpleSearch: "Recherche simple",
						advancedSearch: "Recherche avancée",
					},
					placeholder: "Recherche : Titre, Auteur, Contenu...",
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
	filters: {
		label: {
			articleType: "Type d'article",
			publicationYear: "Année de publication",
			gender: "Sexe",
		},
		apply: "Appliquer les filtres",
		reset: "Réinitialiser les filtres",
	},
	scratch: {
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
		resetPassword: "Réinitialiser le mot de passe",
		search: "Rechercher",
		send: "Envoyer",
		seeMore: "Voir plus",
	},
	responses: {
		user: {
			logged: "Connexion réalisé avec succés.",
		},
		credential: {
			invalid: "Identifiant google invalide.",
		},
		article: {
			notfound: "Article introuvable.",
		},
		document: {
			notfound: "Document introuvable.",
		},
		post: {
			notfound: "Post introuvable.",
		},
		answer: {
			created: "réponse créer",
		},
		SERVER_ERROR: "Veuillez nous excusez, une erreur serveur c'est produite.",
	},
};
