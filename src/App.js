import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import './App.css';

function App() {
	const exchangeRateApi = 'https://api.exchangeratesapi.io/latest';
	const [isLoading, setLoading] = useState(true);
	const [exhangeList, setExchangeList] = useState({});

	useEffect(() => {
		fetchExhangeRate();
	}, []);

	const fetchExhangeRate = async () => {
		try {
			const response = await fetch(exchangeRateApi);
			const result = await response.json();
			setExchangeList(result);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const renderTableBodyRows = () => {
		const rates = exhangeList.rates;

		return Object.keys(rates).map((item, key) => {
			return (
				<tr key={key}>
					<td>{item}</td>
					<td>{rates[item]}</td>
				</tr>
			);
		});
	};

	const renderTableHeaders = () => {
		const headers = ['Currency', 'Value'];

		return headers.map((item, key) => {
			return <th key={key}>{item.toUpperCase()}</th>;
		});
	};

	if (isLoading) {
		return null;
	}

	console.log(exhangeList);

	return (
		<Container fluid>
			<Table striped hover bordered variant="dark">
				<thead>
					<tr>{renderTableHeaders()}</tr>
				</thead>
				<tbody>{renderTableBodyRows()}</tbody>
			</Table>
		</Container>
	);
}

export default App;
