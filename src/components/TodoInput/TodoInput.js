import React from 'react';
import Button from 'react-bootstrap/Button';
import Utils from '../Utils';
import Form from 'react-bootstrap/Form';
import './TodoInput.css';


export default class TodoInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);
	}

	render() {
		// Note: the Todo component will handle the submit event
		return <Form className="todoinput-form-wrapper" onSubmit={this.props.newTaskHandler}>
			<Form.Row>
				<Form.Group>
					<Form.Control
						required
						type="text"
						placeholder="Task"
						id="task-input"
					/>
				</Form.Group>
				<span><Button className="todoinput-submit-btn" type="submit" variant="light">👍</Button></span>
			</Form.Row>
		</Form>;
	}
}
