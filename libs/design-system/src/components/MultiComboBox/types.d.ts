export interface Item {
	label: string;
	value: string | number;
}

declare global {
	type ItemMultiComboBox = Item;
}
