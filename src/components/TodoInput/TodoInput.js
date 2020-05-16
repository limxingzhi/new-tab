import React from 'react';
import Button from 'react-bootstrap/Button';
import Utils from '../Utils';
import Form from 'react-bootstrap/Form';
import './TodoInput.css';


export default class TodoInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);

		this.passInputTextToProps = this.passInputTextToProps.bind(this);
		this.newInputHandler = this.newInputHandler.bind(this);

		this.throttledPassInput = Utils.throttle(
			this.passInputTextToProps,
			200,
			true);
	}

	render() {
		// Note: the Todo component will handle the submit event
		return <Form className="todoinput-form-wrapper" onSubmit={this.newInputHandler}>
			<p className="todoinput-form-inputmessage">Task input, type ; for google search</p>
			<Form.Row>
				<Form.Group className="todoinput-form-group">
					<Form.Control
						onChange={this.throttledPassInput}
						className="todoinput-input-control"
						required
						type="text"
						placeholder="Task input"
						id="task-input"
					/>
					<Button className="todoinput-input-control todoinput-submit-btn" type="submit" variant="light">{this.props.buttonEmoji}</Button>
				</Form.Group>
			</Form.Row>
		</Form>;
	}

	componentDidMount() {
		document.getElementById('task-input').focus();
	}

	newInputHandler(event) {
		this.throttledPassInput();
		this.props.newInputHandler(event);
	}

	passInputTextToProps() {
		this.props.inputTextChangeHandler(document.getElementById('task-input').value);
	}
}
