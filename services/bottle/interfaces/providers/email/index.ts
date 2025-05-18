import nodemailer from "nodemailer";
import { type Attachment } from "nodemailer/lib/mailer";
import { envs } from "@interfaces/envs";

interface SendInput {
	to: string;
	from: string;
	subject: string;
	html: string;
	attachments?: Attachment[];
}

export class EmailProvider {
	public static transporter = nodemailer.createTransport(
		envs.ENVIROMENT === "DEV"
			? {
				host: "maildev",
				port: 1025,
				secure: false,
			}
			: {
				host: "smtp-relay.brevo.com",
				port: 587,
				secure: false,
				auth: {
					user: envs.BREVO_USER,
					pass: envs.BREVO_KEY,
				},
			},
	);

	public static send(input: SendInput) {
		return this.transporter.sendMail(input);
	}
}
