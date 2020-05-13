export default class ValueConstants {
	static metadata() {
		return {
			appVersion: "0.1.0"
		}
	}

	static defaultFeedInfo () {
		return 'https://gist.githubusercontent.com/limxingzhi/04ff839e03592e326d37c8c94bd3c74b/raw/4f680baf59387ccb4468308c649528845dac364f/rss-sources.json';
	}

	static backgroundImageRssSource () {
		return 'https://www.reddit.com/r/EarthPorn+auroraporn+wallpaper+wallpapers.rss?t=day';
	}

	static corsProxy () {
		return 'https://thingproxy.freeboard.io/fetch/';
	}

	static redditRssImageCaptureRegex() {
		return new RegExp('href=\"([^\"]+\).jpg\"');
	}
}
