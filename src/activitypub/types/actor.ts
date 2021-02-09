import { ApLink, IObject, ICollection, IOrderedCollection, getApType } from "./core";

export interface IActor extends IObject {
	// https://www.w3.org/TR/activitypub/#actor-objects
	type: 'Application' | 'Group' | 'Organization' | 'Person' | 'Service' | ['Person', string];
	inbox: IOrderedCollection | ApLink;
	outbox: IOrderedCollection | ApLink;
	following?: IOrderedCollection | ICollection | ApLink;
	followers?: IOrderedCollection | ICollection | ApLink;
	liked?: IOrderedCollection | ICollection | ApLink;
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

	// toot
	// https://docs.joinmastodon.org/spec/activitypub/#featured
	featured?: IOrderedCollection | ICollection | ApLink;

	// https://docs.joinmastodon.org/spec/activitypub/#featuredTags
	featuredTags?: IOrderedCollection | ICollection | ApLink;

	discoverable?: boolean;
	suspended?: boolean;
}

export const validActors = Object.freeze(['Application', 'Group', 'Organization', 'Person', 'Service']);

export const isActor = (object: IObject): object is IActor =>  validActors.includes(getApType(object));
