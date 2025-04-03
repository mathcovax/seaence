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
		},
		[routerPageName.SEARCH_RESULTS_PAGE]: {
			noResults: "Aucun résultat trouvé",
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
	},
	cta: {
		backHome: "Retour à l'accueil",
		connection: "Inscription / Connexion",
		resetPassword: "Réinitialiser le mot de passe",
		search: "Rechercher",
	},
};
