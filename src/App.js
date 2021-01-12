import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Form } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';
import './App.css';

function App() {
	const exchangeRateApi = 'https://api.exchangeratesapi.io/latest';
	const [isLoading, setLoading] = useState(true);
	const [exhangeList, setExchangeList] = useState({});
	const [currentExchange, setCurrentExchange] = useState('');
	const [rateList, setRateList] = useState([]);
	const [exchangeRatesList, setRatesList] = useState([]);
	// const popularExchanges = ['USD', 'EUR', 'RUB'];

	useEffect(() => {
		fetchExhangeRate();
	}, []);

	const fetchExhangeRate = async () => {
		try {
			const response = await fetch(exchangeRateApi);
			const result = await response.json();
			setExchangeList(result);
			setCurrentExchange(result.base);
			const rateKeys = Object.keys(result.rates);
			setRateList(rateKeys);
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
			setRatesList(ratesList);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const alpabetSortFunc = (a, b) => {
		return a.key.toLowerCase().localeCompare(b.key.toLowerCase());
	};

	const sortedAlphabetList = exchangeRatesList
		.filter((item) => {
			return item.key !== currentExchange;
		})
		.sort(alpabetSortFunc);

	const iconHandlerClick = (ev) => {
		const currencyKey = ev.currentTarget.dataset.key;

		const transformedList = exchangeRatesList.map((item) => {
			if (item.key === currencyKey) {
				return { ...item, isFavourite: !item.isFavourite };
			}

			return { ...item };
		});
		setRatesList(transformedList);
	};

	const iconsWrapperStyleOptions = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '50%'
	};

	const iconStyleOptions = {
		marginBottom: '4px'
	};

	const renderTableBodyRows = () => {
		const favourites = sortedAlphabetList.filter((item) => {
			return item.isFavourite;
		});

		const unFavourites = sortedAlphabetList.filter((item) => {
			return !item.isFavourite;
		});

		return [...favourites, ...unFavourites].map((item, key) => {
			return (
				<tr key={key}>
					<td>{item.id}</td>
					<td>{item.key}</td>
					<td>
						<div style={{ ...iconsWrapperStyleOptions }}>
							{item.value}{' '}
							<div
								style={{ ...iconStyleOptions }}
								data-key={item.key}
								onClick={iconHandlerClick}>
								{item.isFavourite ? (
									<StarFill
										style={{
											color: 'yellow'
										}}
									/>
								) : (
									<Star />
								)}
							</div>
						</div>
					</td>
				</tr>
			);
		});
	};

	const handleSelectChange = (event) => {
		const currency = event.target.value;
		recalculateCurrencies(currentExchange, currency);
		setCurrentExchange(currency);
	};

	const filteredSelectRates = () => {
		// const filteredFavouritesRates = sortedAlphabetList.filter((item) => {
		// 	return transformedList[item].isFavourite;
		// });
		// const filteredWOFavourites = sortedAlphabetList.filter((item) => {
		// 	return !transformedList[item].isFavourite;
		// });
		// const list = [...filteredFavouritesRates, ...filteredWOFavourites];
		// return list;
	};

	const recalculateCurrencies = (prevCurrency, nextCurrency) => {
		console.log(prevCurrency, nextCurrency);
		// const calculatedListFromPrev = Object.keys(transformedList).reduce((acc, curr) => {
		// 	console.log(
		// 		curr + ' ',
		// 		transformedList[prevCurrency].value / transformedList[curr].value
		// 	);
		// 	return {
		// 		...acc,
		// 		[curr]: {
		// 			...transformedList[curr],
		// 			value: Number(
		// 				(transformedList[prevCurrency].value / transformedList[curr].value).toFixed(
		// 					4
		// 				)
		// 			)
		// 		}
		// 	};
		// }, {});

		// console.log('calculatedListFromPrev', calculatedListFromPrev);
	};

	const renderCurrencySelection = () => {
		// return (
		// 	<>
		// 		<Form.Label>Custom select</Form.Label>
		// 		<Form.Control as="select" onChange={handleSelectChange} custom>
		// 			{filteredSelectRates().map((value, key) => {
		// 				return (
		// 					<option
		// 						key={key}
		// 						selected={currentExchange === value}
		// 						{...(transformedList[value].isFavourite
		// 							? { style: { 'font-weight': 'bold' } }
		// 							: '')}>
		// 						{value}
		// 					</option>
		// 				);
		// 			})}
		// 		</Form.Control>
		// 	</>
		// );
	};

	const renderTableHeaders = () => {
		const headers = ['№', 'Currency', 'Value'];

		return headers.map((item, key) => {
			return <th key={key}>{item.toUpperCase()}</th>;
		});
	};

	if (isLoading) {
		return (
			<div className="spinner-wrapper">
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</div>
		);
	}

	console.log(exhangeList);
	console.log(exchangeRatesList);

	return (
		<Container fluid>
			<Table striped hover bordered variant="dark">
				<thead>
					<tr>Current currency: {exhangeList.base}</tr>
					<tr>
						{renderTableHeaders()}
						{/* {renderCurrencySelection()} */}
					</tr>
				</thead>
				<tbody>{renderTableBodyRows()}</tbody>
			</Table>
		</Container>
	);
}

export default App;
