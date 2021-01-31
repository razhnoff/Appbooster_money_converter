import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Container, Table, Spinner, Form } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';
import './App.css';
import { useMst } from './store';

function App() {
	const {
		rootStore: {
			isLoading,
			currentCurrency,
			exchangeList,
			exchangeRatesList,
			fetchExhangeRate,
			sortedAlphabetList,
			setRatesList,
			iconHandlerClick
		}
	} = useMst();

	useEffect(() => {
		fetchExhangeRate();
	}, []);

	const iconsWrapperStyleOptions = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '50%'
	};

	const iconStyleOptions = {
		marginBottom: '4px',
		cursor: 'pointer'
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
		// recalculateCurrencies(currentCurrency, currency);
		// setCurrentExchange(currency);
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
		// 						selected={currentCurrency === value}
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

	return (
		<Container fluid>
			<Table striped hover bordered variant="dark">
				<thead>
					<tr>Current currency: {exchangeList.base}</tr>
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

export default observer(App);
