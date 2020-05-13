import React from 'react';
import Timer from '../Timer/Timer';
import Todo from '../Todo/Todo';
import Parser from 'rss-parser';
import ValueConstants from '../ValueConstants';
import Utils from '../Utils';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.parser = new Parser();
		this.state = Utils.deepCopy(props);

		this.state.imageCredits = '';
	}

	render() {
		return <div class="app-wrapper">
			<div>{this.state.imageCredits}</div>
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
		this.setState({
		imageCredits: <a class="app-imagecredits" target="_blank" href={this.state.backgroundImageInfo.link}>{this.state.backgroundImageInfo.title}<br />by {this.state.backgroundImageInfo.author}</a>
		});
	}
}
