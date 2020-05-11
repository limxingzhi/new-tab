import React from 'react';
import { Nav, Navbar, Carousel } from 'react-bootstrap';
import Parser from 'rss-parser';
import Utils from '../Utils';
import './RssFeed.css';
import StorageConstants from '../StorageConstants';

export default class RssFeed extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);

		fetch(StorageConstants.defaultFeedInfo())
			.then((response) => response.json())
			.then((response) => {
				Utils.writeLS('feedInfo', response);
				this.setState({display: <p class="rssfeed-loading">Loading RSS Feed</p>}, this.loadData);
			});
	}

	render() {
		return (
			<Navbar bg="light">
				{this.state.display}
			</Navbar>);
	}

	componentDidMount() {
		this.setState({ feed: [] });

		setInterval(() => {
			this.loadDisplay();
		}, 10 * 1000);

		setInterval(() => {
			this.loadData();
		}, 5 * 60 * 1000);
	}

	loadDisplay() {
		if (!this.state.feed[0]) {
			this.loadData();
			return;
		}
		const displayItem = Utils.deepCopy(this.state.feed)[0];
		this.setState({
			display: <a class="rssfeed-text" href={displayItem.link} target="_blank">
				<span class="rssfeed-metadata">{displayItem.pubDate}</span>
				<span class="rssfeed-title">{displayItem.title}</span>
				<span class="rssfeed-metadata">{displayItem.source}</span>
			</a>
		});
		this.setState({ feed: this.state.feed.slice(1) }, this.sortByDate);

	}

	async loadData() {
		const CORS_PROXY = "https://cors-anywhere.herokuapp.com/https://";
		const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

		this.setState({ feed: [] });

		const parser = new Parser();
		await Utils.readLS("feedInfo").map((feed) => {
			const feedItems = [];
			try {
				parser.parseURL(CORS_PROXY + feed.url)
					.then((response) => {
						response.items.map((item) => {
							const pubDate = new Date(item.pubDate);
							feedItems.push({
								source: feed.name,
								title: item.title,
								link: item.link,
								timestamp: item.pubDate,
								pubDate:
									(pubDate.getHours() > 9 ? pubDate.getHours() : '0' + pubDate.getHours()) + ':' +
									(pubDate.getMinutes() > 9 ? pubDate.getMinutes() : '0' + pubDate.getMinutes()) + '/' +
									pubDate.getDate() + ' ' +
									months[pubDate.getMonth()]
							});
							return null;
						});
					})
					.then(() => {
						this.setState({ feed: [this.state.feed, feedItems].flat(1) });
					});
			} catch (exception) {
				console.error(exception);
			}
			return feedItems;
		});
	}

	sortByDate() {
		const sortedArray = [...this.state.feed].sort((item1, item2) => {
			return item2.timestamp - item1.timestamp;
		});

		this.setState({ feed: sortedArray });
	}
}
