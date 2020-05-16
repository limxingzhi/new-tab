import React from 'react';
import Utils from '../Utils';
import TodoInput from '../TodoInput/TodoInput';
import TodoItem from '../TodoItem/TodoItem';
import ValueConstants from '../ValueConstants';
import sha256 from 'js-sha256';
import './Todo.css';

export default class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);

		this.state.itemsData = [];
		this.state.itemComponents = [];

		this.state.buttonEmoji = ValueConstants.taskEmoji();

		this.newInputHandler = this.newInputHandler.bind(this);
		this.inputTextChangeHandler = this.inputTextChangeHandler.bind(this);
		this.removeTaskHandler = this.removeTaskHandler.bind(this);
		this.initializeState = this.initializeState.bind(this);
	}

	render() {
		return <div class="container todo-wrapper col-md-12">
			<TodoInput
				newInputHandler={this.newInputHandler}
				buttonEmoji={this.state.buttonEmoji}
				inputTextChangeHandler={this.inputTextChangeHandler}
			/>
			{this.state.itemComponents}
		</div>;
	}

	componentDidMount() {
		this.initializeState();

		// Poll from Local storage
		setInterval(() => {
			this.initializeState();
		}, 60 * 1000);
	}

	populateList() {

		const components = this.state.itemsData.map((item) => {
			return <TodoItem
				removeTaskHandler={this.removeTaskHandler}
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

	inputTextChangeHandler(stringInput) {
		switch (stringInput.charAt(0)) {
			case '!':
				this.setState({ buttonEmoji: ValueConstants.searchEmoji() });
				break;
			case '':
				this.setState({ buttonEmoji: ValueConstants.taskEmoji() });
				break;
			default:
				this.setState({ buttonEmoji: ValueConstants.taskEmoji() });
				this.setState({ buttonEmoji: Utils.getEmojiWithHash(sha256(stringInput)) });
				break;
		}
	}

	newInputHandler(event) {
		event.preventDefault();
		event.stopPropagation();

		const stringInput = document.getElementById("task-input").value;

		switch (stringInput.charAt(0)) {
			case '!':
				this.searchHandler(stringInput.slice(1));
				break;
			default:
				this.newTaskHandler(stringInput);
				break;
		}

		document.getElementById("task-input").value = "";
	}

	searchHandler(query) {
		query = query.trim();
		var newTabURL = ValueConstants.searchURL() + encodeURI(query);
		if (query === "") {
			newTabURL = "https://xingzhi.dev";
		}
		window.open(newTabURL, '_blank');
	}

	newTaskHandler(stringInput) {
		stringInput = stringInput.trim();
		stringInput = stringInput ? stringInput : "New task";

		const currentData = this.state.itemsData;
		currentData.push({
			text: stringInput,
			timestamp: Date.now(),
			taskId: Utils.generateUUID()
		});

		this.setState({ itemsData: currentData }, () => {
			this.updateStorage();
			this.populateList();
		});

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
