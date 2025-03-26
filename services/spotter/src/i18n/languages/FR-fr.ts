export const FRfr = {
	page: {
		[routerPageName.HOME_PAGE]: {
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
		[routerPageName.NOT_FOUND_PAGE]: {
			title: "404 - Page non trouvée",
			subtitle: "Désolé, la page que vous recherchez n'existe pas.",
		},
		[routerPageName.REGISTER_PAGE]: {
			title: "Inscription",
			subtitle: "Créez un compte",
			form: {
				email: "Adresse e-mail",
				password: "Mot de passe",
				confirmPassword: "Confirmer le mot de passe",
				terms: "J'accepte les conditions d'utilisation",
				orElse: "Ou inscrivez-vous avec",
				alreadyHaveAccount: "Vous avez déjà un compte ?",
			},
		},
		[routerPageName.LOGIN_PAGE]: {
			title: "Connexion",
			subtitle: "Connectez-vous à votre compte",
			form: {
				email: "Adresse e-mail",
				password: "Mot de passe",
				forgotPassword: "Mot de passe oublié ?",
				orElse: "Ou connectez-vous avec",
				noAccount: "Vous n'avez pas de compte ?",
			},
		},
		[routerPageName.FORGOT_PASSWORD_PAGE]: {
			title: "Mot de passe oublié",
			subtitle: "Réinitialisez votre mot de passe",
			form: {
				email: "Adresse e-mail",
				rememberPassword: "Vous vous souvenez de votre mot de passe ?",
			},
		},
	},
	layout: {
		base: {
			header: {},
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
		register: "S'inscrire",
		login: "Se connecter",
		resetPassword: "Réinitialiser le mot de passe",
	},
};
