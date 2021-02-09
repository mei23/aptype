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
	icon?: IImage | ApLink;
	image?: IImage | ApLink;
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

export interface IOrderedCollection extends ICollectionBase {
	type: 'OrderedCollection';
	orderedItems?: (IObject | ApLink)[];
}

export interface ICollectionPage extends ICollectionPageBase {
	type: 'CollectionPage';
	items?: (IObject | ApLink)[];
}

export interface IOrderedCollectionPage extends ICollectionPageBase {
	type: 'OrderedCollectionPage';
	orderedItems?: (IObject | ApLink)[];
}












// relationship

//#region Document like
export interface IDocument extends IObject {
	type: 'Document';
}

export interface IAudio extends IObject {
	type: 'Audio';
}

export interface IImage extends IObject {
	type: 'Image';
}

export interface IVideo extends IObject {
	type: 'Video';
}

export interface IPage extends IObject {
	type: 'Page';
}
//#endregion

//#region Post like
export interface IArticle extends IObject {
	type: 'Article';
}

export interface INote extends IObject {
	type: 'Note';
}

export interface IEvent extends IObject {
	type: 'Event';
}
//#endregion

export interface IPlace extends IObject {
	type: 'Place';
	accuracy?: number;
	altitude?: number;
	latitude?: number;
	longitude?: number;
	/** units of  altitude*/
	units?: 'cm' | 'feet' | 'inches' | 'km' | 'm' | 'miles';
}

export interface IProfile extends IObject {
	type: 'Profile';
	describes?: IObject;
}

export interface ITombstone extends IObject {
	type: 'Tombstone';
	formerType?: IObject;
	deleted?: Date;
}

export const isLink = (object: IObject): object is ILink => object.type === 'ApLink';



export function extractType(object: IObject): string {
	return typeof object.type === 'string' ? object.type : object.type[0];
}

export function extractId(x: IObject | ApLink): string {
	const id = typeof x === 'string' ? x : isLink(x) ? x.href : x.id;
	if (id == null) throw 'no id';
	return id;
}

export interface IActor extends IObject {
	// https://www.w3.org/TR/activitypub/#actor-objects
	type: 'Person' | 'Service' | 'Organization' | 'Group' | 'Application';
	inbox: IOrderedCollection | ApLink;
	outbox: IOrderedCollection | ApLink;
	following?: IOrderedCollection | ICollection | ApLink;
	followers?: IOrderedCollection | ICollection | ApLink;
	preferredUsername?: string;
	endpoints?: {
		sharedInbox?: IOrderedCollection | ApLink;
	};

	// https://docs.joinmastodon.org/spec/activitypub/#public-key
	publicKey?: {
		id?: string;
		owner?: string;
		publicKeyPem?: string;
	};
}

