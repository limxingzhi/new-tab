import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timer from '../Timer/Timer';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div class="app-wrapper"><Timer /></div>;
	}
}
