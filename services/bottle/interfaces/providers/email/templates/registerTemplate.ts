import { baseTemplate } from "./baseTemplate";

export function registerTemplate(username: string, url: string) {
	return baseTemplate(/* html */
		`
			<h1 style="font-family: Arial, sans-serif; color: #22223b; font-size: 24px; margin: 0 0 36px 0">Bienvenue sur Seaence !</h1>
			<p style="font-family: Arial, sans-serif; color: #4a4e69; font-size: 16px; margin: 0 0 24px 0">
				Bonjour ${username}. Merci de vous être inscrit(e).
				<br><br>
				Prêt(e) à explorer, apprendre et partager sur Seaence ?
				<br>
				Votre aventure commence ici !
			</p>
			<a href="${url}" style="display: inline-block; background-color: #3b82f6; color: #fff; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px; padding: 12px 32px; border-radius: 4px; margin-bottom: 24px;">
				Découvrir Seaence
			</a>
			<p style="font-family: Arial, sans-serif; color: #6c757d; font-size: 13px; margin: 24px 0 0 0">
				Si vous n’êtes pas à l’origine de cette inscription, ignorez simplement cet email.
			</p>
		`,
	);
}
