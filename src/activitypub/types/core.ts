import { IDocumentLike } from "./object";

export type obj = { [x: string]: any };

/** One or many Object or Link */
export type ApJointObject = IObject | ApLink | (IObject | ApLink)[];

export interface IObject {
	'@context'?: string | obj | obj[];
	type: string | string[];
	id?: string;
	attachment?: ApJointObject;
	attributedTo?: ApJointObject;
	audience?: ApJointObject;
	content?: string;
	name?: string;
	endTime?: Date;
	generator?: ApJointObject;
	icon?: IDocumentLike | ApLink;
	image?: IDocumentLike | ApLink;
	inReplyTo?: ApJointObject;
	location?: ApJointObject;
	preview?: IObject | ApLink;
	published?: Date;
	replies?: ICollection;
	startTime?: Date;
	summary?: string;
	tag?: ApJointObject;
	updated?: Date;
	url?: ApLink;
	to?: ApJointObject;
	bto?: ApJointObject;
	cc?: ApJointObject;
	bcc?: ApJointObject;
	mediaType?: string;
	duration?: string;
}

export type ApLink = ILink | string;
export type ApMention = IMention | string;

interface ILinkBase {
	href: string;
	rel?: string | string[];
	mediaType?: string;
	name?: string;
	hreflang?: string;
	height?: number;
	width?: number;
	preview?: IObject | ApLink;
};

interface ILink extends ILinkBase {
	type: 'Link';
};

interface IMention extends ILinkBase {
	type: 'Mention';
};

export const getApType = (object: IObject) => Array.isArray(object.type) ? object.type[0] : object.type;

export const isObject = (object: IObject | ApLink): object is IObject => typeof(object) !== 'string' && getApType(object) !== 'Link';

export const getApId = (object: IObject | ApLink) => {
	const id = typeof object === 'string' ? object : isObject(object) ? object.id : object.href;
	if (id == null) throw 'no id';
	return id;
}

export interface IActivity extends IObject {
	actor?: ApJointObject;
	object?: ApJointObject;
	target?: IObject | ApLink;
	origin?: IObject | ApLink;
	instrument?: ApJointObject;
}

export interface ILdSignature {
	/* Linked Data Signatures */
	signature?: {
		type: string;
		created: Date;
		creator: string;
		domain?: string;
		nonce?: string;
		signatureValue: string;
	};
}

export type ApSignedActivity = IActivity & ILdSignature;

export interface IIntransitiveActivity extends IObject {
	actor?: ApJointObject;
	target?: IObject | ApLink;
	origin?: IObject | ApLink;
	instrument?: ApJointObject;
}

interface ICollectionBase extends IObject {
	totalItems?: number;
	current?: ICollectionPage | ApLink;
	first?: ICollectionPage | ApLink;
	last?: ICollectionPage | ApLink;
}

interface ICollectionPageBase extends ICollectionBase {
	partOf?: ICollectionPage | ApLink;
	next?: ICollectionPage | ApLink;
	prev?: ICollectionPage | ApLink;
}

export interface ICollection extends ICollectionBase {
	type: 'Collection';
	items?: (IObject | ApLink)[];
}

export const isCollection = (object: IObject): object is ICollection => object.type === 'Collection'

export interface IOrderedCollection extends ICollectionBase {
	type: 'OrderedCollection';
	orderedItems?: (IObject | ApLink)[];
}

export const isOrderedCollection = (object: IObject): object is IOrderedCollection => object.type === 'OrderedCollection'

export interface ICollectionPage extends ICollectionPageBase {
	type: 'CollectionPage';
	items?: (IObject | ApLink)[];
}

export const isCollectionPage = (object: IObject): object is ICollectionPage => object.type === 'CollectionPage'

export interface IOrderedCollectionPage extends ICollectionPageBase {
	type: 'OrderedCollectionPage';
	orderedItems?: (IObject | ApLink)[];
}

export const isOrderedCollectionPage = (object: IObject): object is IOrderedCollectionPage => object.type === 'OrderedCollectionPage'
