import { types } from 'mobx-state-tree';
import { Currency } from './Currency';
import { CurrencyAPI } from './CurrencyApi';

export const RootStoreModel = types.model('RootStore', {
	exchangeList: types.optional(CurrencyAPI, {}),
	isLoading: types.optional(types.boolean, true),
	currentCurrency: types.optional(types.string, ''),
	exchangeRatesList: types.optional(types.array(Currency), []),
	apiUrl: 'https://api.exchangeratesapi.io/latest'
});

export const RootStoreActions = types
	.model({})
	.views((self) => ({
		alpabetSortFunc(a, b) {
			return a.key.toLowerCase().localeCompare(b.key.toLowerCase());
		},

		get sortedAlphabetList() {
			return self.exchangeRatesList
				.filter((item) => {
					return item.key !== self.currentCurrency;
				})
				.sort(self.alpabetSortFunc);
		}
	}))
	.actions((self) => ({
		addProp(key, value) {
			self.rates.set(key, value);
		},
		setLoading(value) {
			self.isLoading = value;
		},

		setRatesList(value) {
			self.exchangeRatesList = value;
		},

		setExchangeList(value) {
			console.log(value);
			self.exchangeList = value;
		},

		setCurrentExchange(value) {
			self.currentCurrency = value;
		},

		iconHandlerClick(ev) {
			const currencyKey = ev.currentTarget.dataset.key;

			const transformedList = self.exchangeRatesList.map((item) => {
				if (item.key === currencyKey) {
					return { ...item, isFavourite: !item.isFavourite };
				}

				return { ...item };
			});
			self.setRatesList(transformedList);
		},

		async fetchExhangeRate() {
			try {
				const response = await fetch(self.apiUrl);
				const result = await response.json();
				self.setExchangeList(result);
				self.setCurrentExchange(result.base);
				const rateKeys = Object.keys(result.rates);
				const rates = Object.keys(result.rates).reduce(
					(acc, curr) => {
						return {
							...acc,
							[curr]: {
								value: Number(result.rates[curr].toFixed(2)),
								isFavourite: false
							}
						};
					},
					{
						[result.base]: { value: 1, isFavourite: false }
					}
				);
				const ratesList = Object.keys(rates).map((item, key) => {
					return {
						key: item,
						value: rates[item].value,
						isFavourite: false,
						id: key + 1
					};
				});
				console.log('ratesList', ratesList);
				self.setRatesList(ratesList);
			} catch (err) {
				console.error(err);
			} finally {
				self.setLoading(false);
			}
		}
	}));
