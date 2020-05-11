import React from 'react';
import Timer from '../Timer/Timer';
import Todo from '../Todo/Todo';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div class="app-wrapper"><Timer /><Todo /></div>;
	}

	componentDidMount() {
		document.title = 'NEW TAB';
	}
}
