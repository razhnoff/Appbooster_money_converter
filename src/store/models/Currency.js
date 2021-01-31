import { types } from 'mobx-state-tree';

export const Currency = types.model('Currency', {
	key: types.string,
	id: types.integer,
	value: types.number,
	isFavourite: types.boolean
});
