import React from 'react';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Utils from '../Utils';
import sha256 from 'js-sha256';
import './Todo.css';

const getEmojiWithHash = (input) => {
	const emojiArray = ["😲", "🧐", "👻", "👾", "🤖", "💩", "🐱‍👓", "🐵", "🐶", "🐺", "🐱", "🦁", "🐯", "🦒", "🦊", "🦝", "🐮", "🐷", "🐗", "🐭", "🐹", "🐰", "🐻", "🐨", "🐼", "🐸", "🦓", "🐴", "🦄", "🐔", "🐲", "💫", "🐾", "🐒", "🦍", "🦧", "🦮", "🐕‍🦺", "🐩", "🐕", "🐈", "🐅", "🐆", "🐎", "🦌", "🦏", "💩", "🐂", "🐄", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦘", "🦥", "🦨", "🦡", "🐘", "🐁", "🐀", "🦔", "🐇", "🦎", "🐊", "🐢", "🍓", "🐉", "🦕", "🦖", "🦦", "🦈", "🐬", "🐳", "🐋", "🐟", "🐠", "🐡", "🦐", "🦑", "🐙", "🦞", "🦀", "🐚", "🦆", "🐓", "🦃", "🦅", "🦢", "🦜", "🦩", "🦚", "🦉", "🐦", "🐧", "🐥", "🐤", "🐣", "🦇", "🦋", "🐌", "🐛", "🦟", "🦗", "🐜", "🐝", "🐞", "🦂", "🦠", "🧞‍♀️", "🧞‍♂️", "👤", "👥", "👀", "🦴", "🦷", "👅", "👄", "🧠", "🦾", "🦿", "👣", "🤺", "✌", "🤘", "🤙", "🖐", "💪", "👏", "🎈", "🧨", "✨", "🎉", "🎊", "🎄", "🎎", "🎏", "👓", "👔", "🎓", "💎", "⚾", "🏀", "🏈", "🎱", "🎳", "⛳", "🤿", "🛶", "🎿", "🏒", "🏑", "🏓", "🏸", "🪁", "🎯", "🥋", "🏆", "🎮", "🎲", "🔮", "🧸", "🎷", "🎺", "🎹", "📻", "🔑", "🔨", "🪓", "🔧", "🔩", "🧱", "🧬", "🩺", "💉", "🧪", "🔬", "🔭", "🏹", "🔪", "💾", "💿", "🧮", "📖", "📓", "📜", "🔖", "📰", "📦", "📪", "📝", "💼", "📌", "📎", "📐", "📏", "🍕", "🍔", "🍟", "💘", "🌭", "🥓", "🍳", "🧀", "🥪", "🌮", "🍖", "🍗", "🥩", "🥡", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🦪", "🍣", "🍤", "🍥", "🥮", "🍢", "🧆", "🥣", "🍦", "🍫", "☕", "🍵", "🍻", "🍴", "🥢", "🍉", "🍌", "🍍", "🍒", "🐍", "🍑", "🍆", "🌽", "🚀", "🥕", "🧅", "🍀", "🌿", "🌾", "🌵", "🌴", "🍃", "🍂", "🌳", "🌹", "🧄", "🚗", "🚓", "🚙", "🚎", "🚑", "🚒", "🚔", "🚲", "🛹", "🛴", "🚄", "🥦", "⚓", "🚦", "🏁", "🌌", "🪐", "🌏", "🧭", "🌋", "🏤", "🗼", "🌉", "🗽", "🧷", "🧹", "🧯", "⛅", "⭐", "🌠", "⚡", "🔥", "💧", "🌊", "🌘", "💥", "💯", "✅", "🌐", "📶", "💲"];

	input = parseInt(input, 16);
	input = input % emojiArray.length;

	return emojiArray[input];
}

export default class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);

		this.state.itemsData = [];
		this.state.itemComponents = [];
	}

	render() {
		return <div class="container todo-wrapper col-md-12">
			<div class="col-md-12 todoinput-wrapper">
				<TodoInput newTaskHandler={this.newTaskHandler.bind(this)} />
			</div>
			{this.state.itemComponents}
		</div>;
	}

	componentDidMount() {
		this.initializeState();
	}

	populateList() {

		const components = this.state.itemsData.map((item) => {
			return <TodoItem
				removeTaskHandler={this.removeTaskHandler.bind(this)}
				text={item.text}
				hashValue=""
				taskId={item.taskId}
				timestamp={item.timestamp}
				timeRecord=""
				emoji={item.emoji}
			/>;
		});

		this.setState({ itemComponents: [] },
			() => {
				this.setState({
					itemComponents: components
				})
			}
		);
	}

	updateStorage() {
		try {
			Utils.writeLS("data", { items: this.state.itemsData });
		} catch (exception) {
			Utils.writeLS("data", { items: [] });
		}
	}

	initializeState() {
		try {
			this.setState({ itemsData: Utils.readLS("data")["items"] }, this.populateList);
		} catch (exception) {
			Utils.writeLS("data", { items: [] });
		}
	}

	newTaskHandler(event) {
		event.preventDefault();
		event.stopPropagation();

		const inputElement = document.getElementById("task-input");
		const currentData = this.state.itemsData;
		currentData.push({
			text: inputElement.value,
			timestamp: Date.now(),
			taskId: Utils.generateUUID()
		});

		this.setState({ itemsData: currentData }, () => {
			this.updateStorage();
			this.populateList();
		});

		inputElement.value = "";
	}

	removeTaskHandler(taskId) {
		const currentData = this.state.itemsData.filter((item) => {
			return (item.taskId !== taskId);
		});

		this.setState({ itemsData: currentData }, () => {
			this.updateStorage();
			this.populateList();
		});
	}
}

class TodoItem extends React.Component {
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
			emoji: getEmojiWithHash(hashValue) + " "
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

class TodoInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);
	}

	render() {
		// Note: the Todo component will handle the submit event
		return <div class="todoinput-form-wrapper" onSubmit={this.props.newTaskHandler}><Form>
			<Form.Row>
				<Form.Group>
					<Form.Control
						required
						type="text"
						placeholder="Task"
						id="task-input"
					/>
				</Form.Group>
				<span><Button type="submit" variant="light">👍</Button></span>
			</Form.Row>
		</Form></div>;
	}
}
