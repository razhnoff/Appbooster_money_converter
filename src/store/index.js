import { createContext, useContext } from 'react';
import { types } from 'mobx-state-tree';
import { RootStoreModel, RootStoreActions } from './models/Root';

const RootStore = types.compose(RootStoreModel, RootStoreActions);

export const rootStore = RootStore.create({});

const MSTContext = createContext(null);

export const Provider = MSTContext.Provider;

export function useMst() {
	const store = useContext(MSTContext);
	console.log('MSTContext', MSTContext);
	console.log('store', store);
	if (store === null) {
		throw new Error('Store cannot be null, please add a context provider');
	}
	return store;
}
