import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header'
import App from './components/App/App';
import Utils from './components/Utils'

import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/RobotoMono-Bold.ttf';
import './fonts/RobotoMono-Medium.ttf';
import './fonts/RobotoMono-Regular.ttf';
import StorageConstants from './components/StorageConstants';

ReactDOM.render(
	<div>
		<Header />
		<main class="container index-wrapper">
			<App />
		</main>
	</div>,
	document.getElementById('root')
);

(() => {
	if (window.localStorage.getItem('created') === 'true')
		return;

	// initalize local storage
	window.localStorage.setItem('created', 'true');
	Utils.writeLS('_metadata', StorageConstants.metadata());
})()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
