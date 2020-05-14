import React from 'react';
import Timer from '../Timer/Timer';
import Todo from '../Todo/Todo';
import Parser from 'rss-parser';
import ValueConstants from '../ValueConstants';
import { Button } from 'react-bootstrap';
import Utils from '../Utils';
import './App.css';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.parser = new Parser();
		this.state = Utils.deepCopy(props);

		this.state.imageCredits = <div class="app-imagecredits-section">
			<a class="app-imagecredits">
				<br /><br />
			</a>
			<Button disabled variant="danger" className="app-changebackground-btn btn btn-sm">Loading Background</Button>
		</div>;

		this.fetchBackground = this.fetchBackground.bind(this);
		this.updateBackground = this.updateBackground.bind(this);
	}

	render() {
		return <div class="app-wrapper">
			<div>{this.state.imageCredits}</div>
			<Timer />
			<Todo />
		</div>;
	}

	componentDidMount() {
		this.fetchBackground(this.updateBackground);
	}

	fetchBackground(callback) {
		this.parser.parseURL(ValueConstants.corsProxy() + ValueConstants.backgroundImageRssSource())
			.then((response) => { return response.items })
			.then((response) => {
				var randomItem;
				do {
					randomItem = Utils.randomItemInArray(response);
				} while (
					// Check current background exist
					this.state.backgroundImageInfo !== undefined
					&& (
						// Check random item has image source
						!randomItem.content.match(ValueConstants.redditRssImageCaptureRegex())[1]
						// Check random item has the same title as current background image
						&& this.state.backgroundImageInfo.title === randomItem.content.match(ValueConstants.redditRssImageCaptureRegex())
					)
				);

				console.info(randomItem);
				return randomItem;
			})
			.then((response) => this.setState({
				backgroundImageInfo: {
					author: response.author,
					title: response.title,
					link: response.link,
					imageSrc: response.content.match(ValueConstants.redditRssImageCaptureRegex())[1] + '.jpg'
				}
			}, callback)).catch(exception => {
				console.log(exception);
			});
	}

	updateBackground(callback) {
		document.body.style.backgroundImage = "url(" + this.state.backgroundImageInfo.imageSrc + ")";
		this.setState({
			backgroundBtn: <Button variant="dark" className="app-changebackground-btn btn-sm" onClick={
				() => this.fetchBackground(this.updateBackground)
			}>Change Background</Button>
		}, () => {
			this.setState({
				imageCredits: <div class="app-imagecredits-section">
					<a class="app-imagecredits" target="_blank" href={this.state.backgroundImageInfo.link}>{this.state.backgroundImageInfo.title}<br />wallpaper by {this.state.backgroundImageInfo.author}</a>
					<br />
					{this.state.backgroundBtn}
				</div>
			});
		});
	}
}
