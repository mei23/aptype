//#region Core
export type obj = { [x: string]: obj };

/** One or many Object or Link */
export type JointObject = IObject | Link | (IObject | Link)[];

export interface IObject {
	'@context'?: string | obj | obj[];
	type: string | string[];
	id?: string;
	attachment?: JointObject;
	attributedTo?: JointObject;
	audience?: JointObject;
	content?: string;
	name?: string;
	endTime?: Date;
	generator?: JointObject;
	icon?: IDocumentLike | Link;
	image?: IDocumentLike | Link;
	inReplyTo?: JointObject;
	location?: JointObject;
	preview?: IObject | Link;
	published?: Date;
	replies?: ICollection;
	startTime?: Date;
	summary?: string;
	tag?: JointObject;
	updated?: Date;
	url?: Link;
	to?: JointObject;
	bto?: JointObject;
	cc?: JointObject;
	bcc?: JointObject;
	mediaType?: string;
	duration?: string;
}
export const isObject = (object: IObject | Link): object is IObject => typeof(object) !== 'string' && getType(object) !== 'Link';

interface ILinkBase {
	href: string;
	rel?: string | string[];
	mediaType?: string;
	name?: string;
	hreflang?: string;
	height?: number;
	width?: number;
	preview?: IObject | Link;
}

interface ILink extends ILinkBase {
	type: 'Link';
}

export type Link = ILink | string;

interface IMention extends ILinkBase {
	type: 'Mention';
}

export type Mention = IMention | string;

export const getType = (object: IObject): string => {
	return Array.isArray(object.type) ? object.type[0] : object.type;
}

export const getId = (object: IObject | Link): string => {
	const id = typeof object === 'string' ? object : isObject(object) ? object.id : object.href;
	if (id == null) throw 'no id';
	return id;
}

export interface IActivity extends IObject {
	actor?: JointObject;
	object?: JointObject;
	target?: IObject | Link;
	origin?: IObject | Link;
	instrument?: JointObject;
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

export type SignedActivity = IActivity & ILdSignature;

export interface IIntransitiveActivity extends IObject {
	actor?: JointObject;
	target?: IObject | Link;
	origin?: IObject | Link;
	instrument?: JointObject;
}

interface ICollectionBase extends IObject {
	totalItems?: number;
	current?: ICollectionPage | Link;
	first?: ICollectionPage | Link;
	last?: ICollectionPage | Link;
}

interface ICollectionPageBase extends ICollectionBase {
	partOf?: ICollectionPage | Link;
	next?: ICollectionPage | Link;
	prev?: ICollectionPage | Link;
}

export interface ICollection extends ICollectionBase {
	type: 'Collection';
	items?: (IObject | Link)[];
}
export const isCollection = (object: IObject): object is ICollection => object.type === 'Collection'

export interface IOrderedCollection extends ICollectionBase {
	type: 'OrderedCollection';
	orderedItems?: (IObject | Link)[];
}
export const isOrderedCollection = (object: IObject): object is IOrderedCollection => object.type === 'OrderedCollection'

export interface ICollectionPage extends ICollectionPageBase {
	type: 'CollectionPage';
	items?: (IObject | Link)[];
}
export const isCollectionPage = (object: IObject): object is ICollectionPage => object.type === 'CollectionPage'

export interface IOrderedCollectionPage extends ICollectionPageBase {
	type: 'OrderedCollectionPage';
	orderedItems?: (IObject | Link)[];
}
export const isOrderedCollectionPage = (object: IObject): object is IOrderedCollectionPage => object.type === 'OrderedCollectionPage'
//#endregion Core

//#region Activity
export interface IAccept extends IActivity {
	type: 'Accept';
}
export const isAccept = (activity: IActivity): activity is IAccept => activity.type === 'Accept';

export interface ITentativeAccept extends IActivity {
	type: 'TentativeAccept';
}
export const isTentativeAccept = (activity: IActivity): activity is ITentativeAccept => activity.type === 'TentativeAccept';

export interface IAdd extends IActivity {
	type: 'Add';
}
export const isAdd = (activity: IActivity): activity is IAdd => activity.type === 'Add';

export interface IArrive extends IActivity {
	type: 'Arrive';
}
export const isArrive = (activity: IActivity): activity is IArrive => activity.type === 'Arrive';

export interface ICreate extends IActivity {
	type: 'Create';
}
export const isCreate = (activity: IActivity): activity is ICreate => activity.type === 'Create';

export interface IDelete extends IActivity {
	type: 'Delete';
}
export const isDelete = (activity: IActivity): activity is IDelete => activity.type === 'Delete';

export interface IIgnore extends IActivity {
	type: 'Ignore';
}
export const isIgnore = (activity: IActivity): activity is IIgnore => activity.type === 'Ignore';

export interface IJoin extends IActivity {
	type: 'Join';
}
export const isJoin = (activity: IActivity): activity is IJoin => activity.type === 'Join';

export interface ILeave extends IActivity {
	type: 'Leave';
}
export const isLeave = (activity: IActivity): activity is ILeave => activity.type === 'Leave';

export interface ILike extends IActivity {
	type: 'Like';
	_misskey_reaction?: string;
}
export const isLike = (activity: IActivity): activity is ILike => activity.type === 'Like';

export interface ILikeLike extends IActivity {
	type: 'Like' | 'Dislike' | 'EmojiReaction' | 'EmojiReact';

	/**
	 * Misskeyのリアクション
	 * contentにも同じ値が入ってるのでそっちを見ればいい
	 * */
	_misskey_reaction?: string;
}
export const isLikeLike = (activity: IActivity): activity is ILikeLike => ['Like', 'Dislike', 'EmojiReaction', 'EmojiReact'].includes(getType(activity));

export interface IOffer extends IActivity {
	type: 'Offer';
}
export const isOffer = (activity: IActivity): activity is IOffer => activity.type === 'Offer';

export interface IInvite extends IActivity {
	type: 'Invite';
}
export const isInvite = (activity: IActivity): activity is IInvite => activity.type === 'Invite';

export interface IReject extends IActivity {
	type: 'Reject';
}
export const isReject = (activity: IActivity): activity is IReject => activity.type === 'Reject';

export interface ITentativeReject extends IActivity {
	type: 'TentativeReject';
}
export const isTentativeReject = (activity: IActivity): activity is ITentativeReject => activity.type === 'TentativeReject';

export interface IRemove extends IActivity {
	type: 'Remove';
}
export const isRemove = (activity: IActivity): activity is IRemove => activity.type === 'Remove';

export interface IUndo extends IActivity {
	type: 'Undo';
}
export const isUndo = (activity: IActivity): activity is IUndo => activity.type === 'Undo';

export interface IUpdate extends IActivity {
	type: 'Update';
}
export const isUpdate = (activity: IActivity): activity is IUpdate => activity.type === 'Update';

export interface IView extends IActivity {
	type: 'View';
}
export const isView = (activity: IActivity): activity is IView => activity.type === 'View';

export interface IListen extends IActivity {
	type: 'Listen';
}
export const isListen = (activity: IActivity): activity is IListen => activity.type === 'Listen';

export interface IRead extends IActivity {
	type: 'Read';
}
export const isRead = (activity: IActivity): activity is IRead => activity.type === 'Read';

export interface IMove extends IActivity {
	type: 'Move';
}
export const isMove = (activity: IActivity): activity is IMove => activity.type === 'Move';

export interface ITravel extends IActivity {
	type: 'Travel';
}
export const isTravel = (activity: IActivity): activity is ITravel => activity.type === 'Travel';

export interface IAnnounce extends IActivity {
	type: 'Announce';
}
export const isAnnounce = (activity: IActivity): activity is IAnnounce => activity.type === 'Announce';

export interface IBlock extends IActivity {
	type: 'Block';
}
export const isBlock = (activity: IActivity): activity is IBlock => activity.type === 'Block';

export interface IFlag extends IActivity {
	type: 'Flag';
}
export const isFlag = (activity: IActivity): activity is IFlag => activity.type === 'Flag';

export interface IDislike extends IActivity {
	type: 'Dislike';
}
export const isDislike = (activity: IActivity): activity is IDislike => activity.type === 'Dislike';

// これActivityじゃなくてObjectじゃないの？
// closedにObjectやLinkが来たら何をすればいいの？
// とか、なんかあやしい
/*
export interface IQuestion extends IActivity {
	type: 'Question';
	oneOf?: IObject | Link;
	anyOf?: IObject | Link;
	closed?: IObject | Link | Date | boolean;	
}
export const isQuestion = (activity: IActivity): activity is IQuestion => activity.type === 'Question';
*/
//#endregion

//#region Actor
export interface IActor extends IObject {
	// https://www.w3.org/TR/activitypub/#actor-objects
	type: 'Application' | 'Group' | 'Organization' | 'Person' | 'Service' | ['Person', string];
	inbox: IOrderedCollection | Link;
	outbox: IOrderedCollection | Link;
	following?: IOrderedCollection | ICollection | Link;
	followers?: IOrderedCollection | ICollection | Link;
	liked?: IOrderedCollection | ICollection | Link;
	preferredUsername?: string;
	endpoints?: {
		sharedInbox?: IOrderedCollection | Link;
	};

	// https://docs.joinmastodon.org/spec/activitypub/#public-key
	publicKey?: {
		id?: string;
		owner?: string;
		publicKeyPem?: string;
	};

	// toot
	// https://docs.joinmastodon.org/spec/activitypub/#featured
	featured?: IOrderedCollection | ICollection | Link;

	// https://docs.joinmastodon.org/spec/activitypub/#featuredTags
	featuredTags?: IOrderedCollection | ICollection | Link;

	discoverable?: boolean;
	suspended?: boolean;
}
export const validActors = Object.freeze(['Application', 'Group', 'Organization', 'Person', 'Service']);
export const isActor = (object: IObject): object is IActor =>  validActors.includes(getType(object));
//#endregion

//#region Object
export interface IRelationship extends IObject {
	type: 'Relationship';
	subject?: IObject | Link;
	object?: JointObject;
	relationship?: IObject;
}
export const isRelationship = (object: IObject): object is IRelationship => getType(object) === 'Relationship';

export interface IDocumentLike extends IObject {
	type: 'Document' | 'Audio' | 'Image' | 'Video' | 'Page';

	// toot
	// https://docs.joinmastodon.org/spec/activitypub/#blurhash
	blurhash?: string;

	// https://docs.joinmastodon.org/spec/activitypub/#focalPoint
	focalPoint?: number[];
}
export const validDocuments = Object.freeze(['Document', 'Audio', 'Image', 'Video', 'Page']);
export const isDocumentLike = (object: IObject): object is IDocumentLike => validDocuments.includes(getType(object));

export interface IPostLike extends IObject {
	type: 'Article' | 'Note' | 'Event' | 'Question';

	/** Misskey: Original MFM */
	_misskey_content?: string;
	/** Misskey: Quote target */
	_misskey_quote?: Link;
	
	/**
	 * Biwakodon: Quote target
	 * https://github.com/wakin-/mastodon/pull/39
	 */
	quoteUrl?: Link;

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
export const isPostLike = (object: IObject): object is IPostLike => validPosts.includes(getType(object));

export interface IPlace extends IObject {
	type: 'Place';
	accuracy?: number;
	altitude?: number;
	latitude?: number;
	longitude?: number;
	/** units of altitude */
	units?: 'cm' | 'feet' | 'inches' | 'km' | 'm' | 'miles';
}
export const isPlace = (object: IObject): object is IPlace => getType(object) === 'Place';

export interface IProfile extends IObject {
	type: 'Profile';
	describes?: IObject;
}
export const isProfile = (object: IObject): object is IProfile => getType(object) === 'Profile';

export interface ITombstone extends IObject {
	type: 'Tombstone';
	formerType?: IObject;
	deleted?: Date;
}
export const isTombstone = (object: IObject): object is ITombstone => getType(object) === 'Tombstone';

// https://docs.joinmastodon.org/spec/activitypub/#emoji
export interface IEmoji extends IObject {
	type: 'Emoji';
	// Objectから継承されている以下を使う
	// name: ':name:'
	// icon: Image
}
export const isEmoji = (object: IObject): object is IEmoji => getType(object) === 'Emoji';

// toot:IdentityProof TODO
//#endregion