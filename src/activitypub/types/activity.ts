import { ApLink, IObject, ICollection, IOrderedCollection, getApType, IActivity } from "./core";

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
}
export const isLike = (activity: IActivity): activity is ILike => activity.type === 'Like';

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

export interface IQuestion extends IActivity {
	type: 'Question';
	oneOf?: IObject | ApLink;
	anyOf?: IObject | ApLink;
	closed?: IObject | ApLink | Date | boolean;
}
export const isQuestion = (activity: IActivity): activity is IQuestion => activity.type === 'Question';


