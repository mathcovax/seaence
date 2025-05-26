/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, type VNode, type DefineComponent, isVNode } from "vue";
import { type AnyFunction } from "@duplojs/utils";
import { type BaseLayoutTemplateItem } from "./baseLayout";
import { type CheckLayoutTemplateItem } from "./checkLayout";
import { type MultiLayoutTemplateItem } from "./multiLayout";
import { type FormTemplateItem } from "./form";

type TemplateComponent<
	GenericProps extends object = object,
> = DefineComponent<GenericProps, any, any, any, any, any, any, any, any, object, any>;

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
	| FormTemplateItem;

export type FindLayoutTemplateItem<
	GenericLayout extends AnyFunction,
> = Extract<
	LayoutTemplateItems,
	LayoutTemplateItem<GenericLayout, any>
> extends infer InferedLayoutTemplateItem extends LayoutTemplateItem
	? InferedLayoutTemplateItem
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
			options,
			defaultSlot,
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
