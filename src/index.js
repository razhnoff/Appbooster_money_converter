import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'mobx-react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Convert from './Convert';
import reportWebVitals from './reportWebVitals';
import { rootStore, Provider } from './store';

// const MSTContext = React.createContext(null);

// const Provider = MSTContext.Provider;

// const useMST = (mapStateToProps) => {
// 	const store = useContext(MSTContext);

// 	if (mapStateToProps !== undefined) {
// 		return mapStateToProps(store);
// 	}

// 	return store;
// };

const stores = {
	rootStore
};

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route path="/convertation">
					<Convert />
				</Route>
				<Route path="/">
					<Provider value={stores}>
						<App />
					</Provider>
				</Route>
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
