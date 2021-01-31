import { types } from 'mobx-state-tree';

export const CurrencyAPI = types.model('InitCurrency', {
	base: types.optional(types.string, ''),
	date: types.optional(types.string, ''),
	rates: types.frozen({})
});
