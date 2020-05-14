import React from 'react';
import Utils from '../Utils';
import TodoInput from '../TodoInput/TodoInput';
import TodoItem from '../TodoItem/TodoItem';
import './Todo.css';

export default class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);

		this.state.itemsData = [];
		this.state.itemComponents = [];

		this.newTaskHandler = this.newTaskHandler.bind(this);
		this.removeTaskHandler = this.removeTaskHandler.bind(this);
		this.initializeState = this.initializeState.bind(this);
	}

	render() {
		return <div class="container todo-wrapper col-md-12">
			<div class="col-md-12 todoinput-wrapper">
				<TodoInput newTaskHandler={this.newTaskHandler} />
			</div>
			{this.state.itemComponents}
		</div>;
	}

	componentDidMount() {
		this.initializeState();

		setInterval(() => {
			this.initializeState();
		}, 2 * 1000);
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
