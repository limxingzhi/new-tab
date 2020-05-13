import React from 'react';
import Toast from 'react-bootstrap/Toast';
import sha256 from 'js-sha256';
import Utils from '../Utils';
import './TodoItem.css';

export default class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);
	}

	render() {
		return <div class="todoitem-toast-wrapper" taskId={this.state.taskId}>
			<Toast onClose={this.closeToast.bind(this)}>
				<Toast.Header>
					<p class="mr-auto todoitem-id" >{this.state.hashValue}</p>
				</Toast.Header>
				<Toast.Body>
					<p class="todoitem-text">{this.state.text}</p>
					<small>
						{this.state.emoji}<span class="todoitem-date">{this.state.timeRecord}</span>
					</small>
				</Toast.Body>
			</Toast>
		</div>;
	}

	componentDidMount() {
		// Update time
		this.updateTimeRecord();
		setInterval(() => {
			this.updateTimeRecord();
		}, 3000);

		const hashValue = sha256(this.state.text)

		this.setState({
			hashValue: hashValue,
			emoji: Utils.getEmojiWithHash(hashValue) + " "
		});
	}

	closeToast(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.removeTaskHandler(this.state.taskId);
	}

	updateTimeRecord() {
		const difference = (Date.now() - this.state.timestamp) / 1000;
		const hours = Math.floor(difference / 60 / 60);
		const minutes = Math.floor(difference / 60) - (hours * 60);

		var timeRecord = '';

		if (minutes <= 0 && hours <= 0) {
			timeRecord = 'Just added';
		}

		if (minutes === 1) {
			timeRecord = minutes + ' min ago';
		} else if (minutes > 1) {
			timeRecord = minutes + ' mins ago';
		} else if (hours > 0) {
			timeRecord = 'ago';
		}

		if (hours === 1) {
			timeRecord = hours + ' hour ' + timeRecord;
		} else if (hours > 1) {
			timeRecord = hours + ' hours ' + timeRecord;
		}

		this.setState({ timeRecord: timeRecord });
	}
}
