// デファクトでまあいけるルーチン
// 厳密にはLinkをリモート解決する必要があるが、まあしなくても問題ないものたち

import { IEmoji, IHashtag, IObject, isEmoji, isObject, isHashtag } from './types';

/**
 * とりあえずなんでも配列であることを保証する関数
 */
function toArray<T>(x: T | T[] | null | undefined): T[] {
	if (x == null) return [];
	return Array.isArray(x) ? x : [x];
}

/**
 * とりあえず最初の値を取る関数
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toSingle<T>(x: T | T[] | null | undefined): T | null | undefined {
	if (x == null) return x;
	return Array.isArray(x) ? x[0] : x;
}

/**
 * filterに入れてnull | undefined以外を取り出すためのfunction
 */
function isNonNull<T>(x: T | null | undefined): x is T {
	return x != null;
}

/**
 * オブジェクトからカスタム絵文字を取得して { name: ':name:', url '...' }[] みたいにします
 */
export function extractEmojis(object: IObject): { name: string, url: string }[] {
	const toEmoji = (x: IEmoji) => {
		if (x.name != null && isObject(x.icon) && typeof x.icon?.url === 'string') {
			return {
				name: x.name,
				url: x.icon.url
			}
		} else {
			return null;
		}
	};

	return toArray(object.tag).filter(isObject).filter(isEmoji).map(toEmoji).filter(isNonNull);
}

/**
 * オブジェクトからハッシュタグを取得して '#tag'[] みたいにします
 */
export function extractHashTags(object: IObject): string[] {
	const toHashtag = (x: IHashtag) => {
		if (x.name != null) {
			return x.name
		} else {
			return null;
		}
	};

	return toArray(object.tag).filter(isObject).filter(isHashtag).map(toHashtag).filter(isNonNull);
}

