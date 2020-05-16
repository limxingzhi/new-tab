import React from 'react';
import './Timer.css';

export default class Timer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
			weekDays: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
			time: null,
			date: null,
			weekdayPretty: null,
			timestamp: null,
		}
	}

	render() {
		return <div class="container timer-wrapper">
			<h1 id="timer-time">{this.state.time}</h1>
			<h5 id="timer-timestamp">{this.state.timestamp}</h5>
			<h2 id="timer-date">{this.state.date}</h2>
			<h5 id="timer-prettyday">{this.state.weekdayPretty}</h5>
		</div>;
	}

	componentDidMount() {
		const now = Date.now();
		this.setState({
			time: this.convertTime(now),
			timestamp: now,
			date: this.convertDate(now),
			weekdayPretty: this.convertDay(now)
		});

		// Update time
		setInterval(() => {
			this.setState({
				time: this.convertTime(Date.now())
			});
		}, 125);

		// Update timestamp
		setInterval(() => {
			this.setState({
				timestamp: Date.now()
			});
		}, 23);

		// Update date once every second
		setInterval(() => {
			const now = Date.now();
			this.setState({
				date: this.convertDate(now),
				weekdayPretty: this.convertDay(now)
			});
		}, 1500);
	}

	convertTime(timestamp) {
		const now = new Date(timestamp);
		const seconds = now.getSeconds();
		const minutes = now.getMinutes();
		const hours = now.getHours();
		return (hours > 9 ? hours : '0' + hours) + ' : ' + (minutes > 9 ? minutes : '0' + minutes) + ' : ' + (seconds > 9 ? seconds : '0' + seconds);
	}

	convertDate(timestamp) {
		const now = new Date(timestamp);
		return now.getDate() + ' ' + this.state.months[now.getMonth()] + ' ' + now.getFullYear();
	}

	convertDay(timestamp) {
		return this.state.weekDays[(new Date(timestamp)).getDay()];
	}
}
