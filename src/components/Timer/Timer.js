import React, { Component } from 'react';
import './Timer.css';

export default class Timer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
			time: null,
			date: null,
			timestamp: null
		}
	}

	render() {
		return <div class="container countdown-wrapper">
			<h1 id="timer-time">{this.state.time}</h1>
			<h5>{this.state.timestamp}</h5>
			<h2 id="timer-date">{this.state.date}</h2>
		</div>;
	}

	componentDidMount() {
		// Update time
		setInterval(() => {
			this.setState({
				time: this.convertTime(Date.now()),
			})
		}, 125);

		// Update timestamp
		setInterval(() => {
			this.setState({
				timestamp: Date.now()
			})
		}, 23);

		// Update date once every second
		setInterval(() => {
			this.setState({
				date: this.convertDate(Date.now())
			})
		}, 1000);
	}

	convertTime(timestamp) {
		const now = new Date(timestamp);
		const seconds = now.getSeconds();
		const minutes = now.getMinutes();
		const hours = now.getHours();
		return  (hours > 9 ? hours : '0' + hours) + ' : ' +  (minutes > 9 ? minutes : '0' + minutes) + ' : ' + (seconds > 9 ? seconds : '0' + seconds);
	}

	convertDate(timestamp) {
		const now = new Date(timestamp);
		return now.getDate() + ' ' + this.state.months[now.getMonth()] + ' ' + now.getFullYear();
	}
}
