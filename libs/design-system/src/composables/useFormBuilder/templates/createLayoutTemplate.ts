/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, type VNode, type DefineComponent, isVNode } from "vue";
import { type AnyFunction, type IsEqual } from "@duplojs/utils";
import { type BaseLayoutTemplateItem } from "./baseLayout";
import { type CheckLayoutTemplateItem } from "./checkLayout";
import { type MultiLayoutTemplateItem } from "./multiLayout";
import { type FormTemplateItem } from "./form";
import { type TextLayoutTemplateItem } from "./textLayout";
import { type UnionLayoutTemplateItem } from "./unionLayout";
import { type RepeatLayoutTemplateItem } from "./repeatLayout";

type TemplateComponent = DefineComponent<any, any, any, any, any, any, any, any, any, object, any>;

export interface LayoutTemplateItem<
	GenericLayout extends AnyFunction = AnyFunction,
	GenericProps extends object = object,
	GenericTemplateRender extends TemplateRender<object, any> = TemplateRender<object>,
> {
	layout: GenericLayout;
	porps: GenericProps;
	templateRender: GenericTemplateRender;
}

export type MaybeArray<
	GenericValue extends unknown,
> = GenericValue | GenericValue[];

export type TemplateSlotNode = MaybeArray<VNode | null | boolean>;

export type TemplateRender<
	GenericLayoutTemplateProps extends object,
	GenericSlot extends unknown = TemplateSlotNode,
> = (
	props: GenericLayoutTemplateProps,
	defaultSlot: GenericSlot,
) => VNode;

export type LayoutTemplateItems =
	| BaseLayoutTemplateItem
	| CheckLayoutTemplateItem
	| MultiLayoutTemplateItem
	| FormTemplateItem
	| TextLayoutTemplateItem
	| UnionLayoutTemplateItem
	| RepeatLayoutTemplateItem;

export type FindLayoutTemplateItem<
	GenericLayout extends AnyFunction,
> = {
	[
	LayoutTemplateItem in LayoutTemplateItems
	as IsEqual<LayoutTemplateItem["layout"], GenericLayout> extends true
		? string : never
	]: LayoutTemplateItem
}[any] extends infer LayoutTemplateItem extends LayoutTemplateItems
	? LayoutTemplateItem
	: never;

export function createLayoutTemplate<
	GenericLayout extends LayoutTemplateItems["layout"],
	GenericDefineComponent extends TemplateComponent,
>(
	_layout: GenericLayout,
	component: GenericDefineComponent,
) {
	function template(
		props: Omit<
			InstanceType<GenericDefineComponent>["$props"],
			keyof FindLayoutTemplateItem<GenericLayout>["porps"]
		>,
	): FindLayoutTemplateItem<GenericLayout>["templateRender"] {
		return (
			options: any,
			defaultSlot: any,
		) => h(
			component,
			{
				...options,
				...props,
			},
			defaultSlot
			&& typeof defaultSlot === "object"
			&& !isVNode(defaultSlot)
			&& !Array.isArray(defaultSlot)
				? defaultSlot
				: () => [defaultSlot],
		);
	}

	return template;
}
