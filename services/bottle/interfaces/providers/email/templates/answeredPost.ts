import { baseTemplate } from "./baseTemplate";

interface Content {
	username: string;
	commenter: string;
	postTitle: string;
	commentContent: string;
	url: string;
}

export function answeredPost(content: Content) {
	return baseTemplate(/* html */ `
        <h1 style="font-family: Arial, sans-serif; color: #22223b; font-size: 24px; margin: 0 0 36px 0">
            Nouvelle réponse à votre post !
        </h1>
        <p style="font-family: Arial, sans-serif; color: #4a4e69; font-size: 16px; margin: 0 0 24px 0">
            Bonjour ${content.username},<br>
            <b>${content.commenter}</b> vient de commenter votre post :<br>
            <span style="font-style: italic; color: #3b82f6;">"${content.postTitle}"</span>
        </p>
        <blockquote style="font-family: Arial, sans-serif; color: #22223b; background: #f6f8fa; border-left: 4px solid #3b82f6; margin: 0 0 24px 0; padding: 12px 16px;">
            ${content.commentContent}
        </blockquote>
        <a href="${content.url}" style="display: inline-block; background-color: #3b82f6; color: #fff; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px; padding: 12px 32px; border-radius: 4px; margin-bottom: 24px;">
            Voir la discussion
        </a>
        <p style="font-family: Arial, sans-serif; color: #6c757d; font-size: 13px; margin: 24px 0 0 0">
            Si vous ne souhaitez plus recevoir ces notifications, modifiez vos préférences dans votre espace personnel.
        </p>
    `);
}
