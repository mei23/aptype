import { IObject, isObject } from './types';

function toArray<T>(x: T | T[] | null | undefined): T[] {
	if (x == null) return [];
	return Array.isArray(x) ? x : [x];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toSingle<T>(x: T | T[] | null | undefined): T | null | undefined {
	if (x == null) return x;
	return Array.isArray(x) ? x[0] : x;
}

function isNonNull<T>(x: T | null | undefined): x is T {
	return x != null;
}

export function extractEmojis(object: IObject): { name: string, url: string }[] {
	// type: 'Emoji' でresolveが必要ない場合のみEmojiとして認識 or null
	const toEmoji = (x: IObject) => {
		if (x.name != null && isObject(x.icon) && typeof x.icon?.url === 'string') {
			return {
				name: x.name,
				url: x.icon.url
			}
		} else {
			return null;
		}
	};

	return toArray(object.tag).filter(isObject).map(toEmoji).filter(isNonNull);
}
