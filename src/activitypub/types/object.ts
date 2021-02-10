import { ApLink, IObject, ApJointObject, getApType, ICollection } from "./core";

export interface IRelationship extends IObject {
	type: 'Relationship';
	subject?: IObject | ApLink;
	object?: ApJointObject;
	relationship?: IObject;
}

export const isRelationship = (object: IObject): object is IRelationship => getApType(object) === 'Relationship';

export interface IDocumentLike extends IObject {
	type: 'Document' | 'Audio' | 'Image' | 'Video' | 'Page';

	// toot
	// https://docs.joinmastodon.org/spec/activitypub/#blurhash
	blurhash?: string;

	// https://docs.joinmastodon.org/spec/activitypub/#focalPoint
	focalPoint?: number[];
}

export const validDocuments = Object.freeze(['Document', 'Audio', 'Image', 'Video', 'Page']);

export const isDocumentLike = (object: IObject): object is IDocumentLike => validDocuments.includes(getApType(object));

export interface IPostLike extends IObject {
	type: 'Article' | 'Note' | 'Event' | 'Question';

	/** Misskey: Original MFM */
	_misskey_content?: string;
	/** Misskey: Quote target */
	_misskey_quote?: ApLink;
	
	/**
	 * Biwakodon: Quote target
	 * https://github.com/wakin-/mastodon/pull/39
	 */
	quoteUrl?: ApLink;

	// Mastodon/Misskey: Question
	oneOf?: IQuestionChoice[];
	anyOf?: IQuestionChoice[];
	endTime?: Date;
	closed?: Date;
	votersCount?: number;
}

interface IQuestionChoice {
	name?: string;
	replies?: ICollection;
	_misskey_votes?: number;
}

export const validPosts = Object.freeze(['Article', 'Note', 'Event']);

export const isPostLike = (object: IObject): object is IPostLike => validPosts.includes(getApType(object));

export interface IPlace extends IObject {
	type: 'Place';
	accuracy?: number;
	altitude?: number;
	latitude?: number;
	longitude?: number;
	/** units of altitude */
	units?: 'cm' | 'feet' | 'inches' | 'km' | 'm' | 'miles';
}

export const isPlace = (object: IObject): object is IPlace => getApType(object) === 'Place';

export interface IProfile extends IObject {
	type: 'Profile';
	describes?: IObject;
}

export const isProfile = (object: IObject): object is IProfile => getApType(object) === 'Profile';

export interface ITombstone extends IObject {
	type: 'Tombstone';
	formerType?: IObject;
	deleted?: Date;
}

export const isTombstone = (object: IObject): object is ITombstone => getApType(object) === 'Tombstone';

// https://docs.joinmastodon.org/spec/activitypub/#emoji
export interface IEmoji extends IObject {
	type: 'Emoji';
	// name: ':name:'
	// icon: Image
}

// toot:IdentityProof TODO
