export default class ValueConstants {
	static metadata() {
		return {
			appVersion: "0.1.0"
		}
	}

	static defaultFeedInfo () {
		return 'https://gist.githubusercontent.com/limxingzhi/04ff839e03592e326d37c8c94bd3c74b/raw';
	}

	static backgroundImageRssSource () {
		return 'reddit.com/r/EarthPorn+auroraporn+wallpaper+wallpapers.rss?t=day';
	}

	static corsProxy () {
		return 'https://xingzhi.dev/corsanywhere/';
	}

	static redditRssImageCaptureRegex() {
		return new RegExp('href=\"([^\"]+\.(jpg|png))\"');
	}
}
