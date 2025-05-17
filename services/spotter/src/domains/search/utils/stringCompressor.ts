import Pako from "pako";

export function stringCompresor(value: string) {
	const deflated = Pako.deflate(value);
	const base64 = btoa(String.fromCharCode(...deflated));
	return encodeURIComponent(base64);
}

const textDecoder = new TextDecoder();
const indexCharCode = 0;

export function stringDecompresor(value: string) {
	const binaryString = atob(decodeURIComponent(value));
	const charData = new Uint8Array(
		binaryString
			.split("")
			.map((char) => char.charCodeAt(indexCharCode)),
	);
	const inflated = Pako.inflate(charData);
	return textDecoder.decode(inflated);
}
