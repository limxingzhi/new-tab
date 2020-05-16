import React from 'react';
import { Navbar } from 'react-bootstrap';
import Parser from 'rss-parser';
import Utils from '../Utils';
import './RssFeed.css';
import ValueConstants from '../ValueConstants';

export default class RssFeed extends React.Component {
	constructor(props) {
		super(props);
		this.state = Utils.deepCopy(props);
		this.parser = new Parser();

		fetch(ValueConstants.defaultFeedInfo())
			.then((response) => response.json())
			.then((response) => {
				Utils.writeLS('feedInfo', response);
				this.setState({ display: <p class="rssfeed-loading">Loading RSS Feed</p> }, this.loadData);
			});
	}

	render() {
		return <Navbar className="rssfeed-wrapper" bg="dark" id="rssfeed">
			{this.state.display}
		</Navbar>
	}

	componentDidMount() {
		this.setState({ feed: [], feedArchive: [] });

		// Refresh RSS reader
		setInterval(() => {
			this.loadDisplay();
		}, 15 * 1000);

		// Load new data
		setInterval(() => {
			this.setState({ feed: [] }, this.loadData);
		}, 5 * 60 * 1000);

		// Clear read archives
		setInterval(() => {
			this.setState({ feedArchive: [] }, this.loadData);
		}, 60 * 60 * 1000);
	}

	loadDisplay() {
		if (!this.state.feed[0]) {
			this.loadData();
			return;
		} else {
			this.sortByDate();
		}

		const feedClone = Utils.deepCopy(this.state.feed);
		const displayItem = feedClone[0];
		const updatedFeed = feedClone.slice(1, feedClone.length-1);
		const updatedFeedArchive = [this.state.feedArchive, displayItem].flat(1);

		this.setState({
			display: null,
			feedArchive: updatedFeedArchive,
			feed: updatedFeed
		}, () => {
			this.setState({
				display: <a class="rssfeed-text" href={displayItem.link} target="_blank">
					<span class="rssfeed-metadata">{displayItem.pubDate}</span>
					<span class="rssfeed-title rssfeed-typing">{displayItem.title}</span>
					<span class="rssfeed-metadata">{displayItem.source}</span>
				</a>
			}, this.sortByDate);
		});

	}

	loadData() {
		const CORS_PROXY = ValueConstants.corsProxy();
		const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

		Utils.readLS("feedInfo").map((feed) => {
			const feedItems = [];
			try {
				this.parser.parseURL(CORS_PROXY + feed.url)
					.then((response) => {
						response.items.map((item) => {
							const pubDate = new Date(item.pubDate);
							feedItems.push({
								source: feed.name,
								title: item.title,
								link: item.link,
								timestamp: (new Date(item.pubDate)).getTime(),
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
						this.setState({ feed: [this.state.feed, feedItems].flat(1) }, this.sortByDate);
					});
			} catch (exception) {
				console.error(exception);
			}
			return feedItems;
		});
	}

	sortByDate() {
		var sortedArray = Utils.deepCopy(this.state.feed);

		// Remove shown items
		sortedArray = sortedArray.filter((item, index) => {
			if (this.state.feedArchive.find(element => element.title === item.title)) {
				console.log(item.title);
			}
			return !(this.state.feedArchive.find(element => element.title === item.title) !== undefined);
		});

		// Sort by descending timestamp
		sortedArray = sortedArray.sort((item1, item2) => {
			return item2.timestamp - item1.timestamp;
		});

		if (sortedArray.length === 0) {
			this.loadData();
		}

		this.setState({ feed: sortedArray });
	}
}
