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
		[profilePage.name]: {
			personalInfo: {
				title: "Informations personnelles",
				label: {
					lastName: "Nom",
					firstName: "Prénom",
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
			form: {
				topic: {
					label: {
						value: "Titre",
						infos: "(soyez clair et précis)",
					},
					placeholder: "Exemple : Comment interpréter les données du graphique page 5 ?",
					writingHelp: `Résumez le problème de manière concise.
					Soyez spécifique pour augmenter les chances d’obtenir une réponse utile.`,
					errors: {
						minLength: "Le titre doit faire au moins {value} caractères.",
						maxLength: "Le titre doit faire au plus {value} caractères.",
					},
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
				accountDropdown: {
					title: "Mon compte",
					profile: "Mon profil",
					disconnect: "Se déconnecter",
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
			notfound: "Utilisateur introuvable.",
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
			created: "Post créé avec succés.",
			notfound: "Post introuvable.",
		},
		answer: {
			created: "Réponse créé avec succés.",
		},
		SERVER_ERROR: "Veuillez nous excusez, une erreur serveur c'est produite.",
	},
};
