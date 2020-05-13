import React from 'react';
import Timer from '../Timer/Timer';
import Todo from '../Todo/Todo';
import Parser from 'rss-parser';
import ValueConstants from '../ValueConstants';
import Utils from '../Utils';
import { Footer } from 'react-bootstrap';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.parser = new Parser();
	}

	render() {
		return <div class="app-wrapper">
			<Timer />
			<Todo />
		</div>;
	}

	componentDidMount() {
		document.title = 'NEW TAB';
		try {
			this.fetchBackground(this.updateBackground);
		} catch (exception) {
			this.fetchBackground(this.updateBackground);
		}
	}

	componentDidUpdate() {

	}

	fetchBackground(callback) {
		this.parser.parseURL(ValueConstants.corsProxy() + ValueConstants.backgroundImageRssSource())
			.then((response) => { return response.items })
			.then((response) => Utils.randomItemInArray(response, 20))
			// .then((response) => console.log(response));
			.then((response) => this.setState({
				backgroundImageInfo: {
					author: response.author,
					title: response.title,
					link: response.link,
					imageSrc: response.content.match(ValueConstants.redditRssImageCaptureRegex())[1] + '.jpg'
				}
			}, callback));
	}

	updateBackground() {
		document.body.style.backgroundImage = "url(" + this.state.backgroundImageInfo.imageSrc + ")";
	}
}
