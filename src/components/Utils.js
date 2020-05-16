export default class Utils {

	/**
	 * This function returns a UUID
	 * Taken from from https://stackoverflow.com/a/8809472/6622966
	 *
	 * @return {string} A UUID in string
	 *
	 * @example
	 */
	static generateUUID() {
		// Public Domain/MIT
		var d = new Date().getTime();

		if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
			d += performance.now(); //use high-precision timer if available
		}

		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
	}

	/**
	 * This function checks if local storage is available
	 *
	 * @return {Boolean} Existence of local storage
	 */
	static checkLocalStorage() {
		var test = 'test';

		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch (e) {
			return false;
		}
	}

	/**
	 * This function reads an string for the key and an object to write to
	 *
	 * @param {string} key - The key of the object to write to
	 * @param {Object} inputObj - The JSON Object to stringify and write to the local storage
	 */
	static writeLS(key, inputObj) {
		if (key !== "_metadata") {
			window.localStorage.setItem(key, JSON.stringify(inputObj));
			return;
		}

		// update _metadata
		var metadata = this.readLS("_metadata");
		metadata = metadata ? metadata : {};
		metadata.lastWritten = Date.now().toString();
		metadata = { ...metadata, ...inputObj };
		window.localStorage.setItem("_metadata", JSON.stringify(metadata));
	}

	/**
	 * This function reads a value in local storage and parse that data into an object
	 *
	 * @param {string} key - The key of the object to read from
	 *
	 * @return {Object} A UUID in string
	 */
	static readLS(key) {
		return JSON.parse(window.localStorage.getItem(key));
	}

	/**
	 * This function throttles a function
	 * https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca
	 * https://www.30secondsofcode.org/js/s/throttle
	 *
	 * @param {function} callback - The callback function to invoke
	 * @param {number} wait - The number of milliseconds to wait before invoking the callback
	 * @param {boolean} immediate - Calls the function before or after the wait, defaults to false
	 */
	static throttle(callback, wait, immediate = false) {
		let timeout = null
		let initialCall = true

		return function () {
			const callNow = immediate && initialCall
			const next = () => {
				callback.apply(this, arguments)
				timeout = null
			}

			if (callNow) {
				initialCall = false
				next()
			}

			if (!timeout) {
				timeout = setTimeout(next, wait)
			}
		}
	}

	/**
	 * This function debounces a function
	 * https://gist.github.com/beaucharman/1f93fdd7c72860736643d1ab274fee1a
	 * https://www.30secondsofcode.org/js/s/throttle
	 *
	 * @param {function} callback - The callback function to invoke
	 * @param {number} wait - The number of milliseconds to wait before invoking the callback
	 * @param {boolean} immediate - Whether to invoke the function immediately
	 */
	static debounce(callback, wait) {
		var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		var timeout = null;
		return function () {
			var _arguments = arguments,
				_this = this;

			var callNow = immediate && !timeout;

			var next = function next() {
				return callback.apply(_this, _arguments);
			};

			clearTimeout(timeout);
			timeout = setTimeout(next, wait);

			if (callNow) {
				next();
			}
		};
	}

	/**
	 * This function returns the values of the keys passed in
	 * https://dev.to/rajnishkatharotiya/pick-desired-key-value-pair-from-an-object-48aa
	 *
	 * Sample usage
	 *
	 * const stubData = {
	 *   "a": 0,
	 *   "b": 1,
	 *   "c": 2
	 * }
	 * console.log(pick(stubData, ['a', 'b']))
	 *
	 * @param {function} pick - The pick function to chose the value with a key within an object
	 * @param {object} obj - The object containing all of the key value pairs we want
	 * @param {array} keys - The keys which values we want to know
	 */
	static pick(obj, keys) {
		return keys.reduce(function (acc, record) {
			return record in obj && (acc[record] = obj[record]), acc;
		}, {});
	}

	/**
	 * This function returns a deep copy of the input object
	 * https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
	 *
	 * @param inObject object to copy
	 */
	static deepCopy(inObject) {
		var outObject, value, key;

		if (typeof (inObject) !== "object" || inObject === null) {
			return inObject; // Return the value if inObject is not an object
		} // Create an array or object to hold the values

		outObject = Array.isArray(inObject) ? [] : {};

		for (key in inObject) {
			value = inObject[key]; // Recursively (deep) copy for nested objects, including arrays
			outObject[key] = this.deepCopy(value);
		}

		return outObject;
	}

	/**
	 * This function returns a emoji based on your hash value
	 * It converts your hash value into base 10 from 16, then mod it based on the length of the array
	 *
	 * @param input hash value input in string
	 */
	static getEmojiWithHash = (input) => {
		const emojiArray = ["😲", "🧐", "👻", "👾", "🤖", "💩", "🐱‍👓", "🐵", "🐶", "🐺", "🐱", "🦁", "🐯", "🦒", "🦊", "🦝", "🐮", "🐷", "🐗", "🐭", "🐹", "🐰", "🐻", "🐨", "🐼", "🐸", "🦓", "🐴", "🦄", "🐔", "🐲", "💫", "🐾", "🐒", "🦍", "🦧", "🦮", "🐕‍🦺", "🐩", "🐕", "🐈", "🐅", "🐆", "🐎", "🦌", "🦏", "💩", "🐂", "🐄", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦘", "🦥", "🦨", "🦡", "🐘", "🐁", "🐀", "🦔", "🐇", "🦎", "🐊", "🐢", "🍓", "🐉", "🦕", "🦖", "🦦", "🦈", "🐬", "🐳", "🐋", "🐟", "🐠", "🐡", "🦐", "🦑", "🐙", "🦞", "🦀", "🐚", "🦆", "🐓", "🦃", "🦅", "🦢", "🦜", "🦩", "🦚", "🦉", "🐦", "🐧", "🐥", "🐤", "🐣", "🦇", "🦋", "🐌", "🐛", "🦟", "🦗", "🐜", "🐝", "🐞", "🦂", "🦠", "🧞‍♀️", "🧞‍♂️", "👤", "👥", "👀", "🦴", "🦷", "👅", "👄", "🧠", "🦾", "🦿", "👣", "🤺", "✌", "🤘", "🤙", "🖐", "💪", "👏", "🎈", "🧨", "✨", "🎉", "🎊", "🎄", "🎎", "🎏", "👓", "👔", "🎓", "💎", "⚾", "🏀", "🏈", "🎱", "🎳", "⛳", "🤿", "🛶", "🎿", "🏒", "🏑", "🏓", "🏸", "🪁", "🎯", "🥋", "🏆", "🎮", "🎲", "🔮", "🧸", "🎷", "🎺", "🎹", "📻", "🔑", "🔨", "🪓", "🔧", "🔩", "🧱", "🧬", "🩺", "💉", "🧪", "🔬", "🔭", "🏹", "🔪", "💾", "💿", "🧮", "📖", "📓", "📜", "🔖", "📰", "📦", "📪", "📝", "💼", "📌", "📎", "📐", "📏", "🍕", "🍔", "🍟", "💘", "🌭", "🥓", "🍳", "🧀", "🥪", "🌮", "🍖", "🍗", "🥩", "🥡", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🦪", "🍣", "🍤", "🍥", "🥮", "🍢", "🧆", "🥣", "🍦", "🍫", "☕", "🍵", "🍻", "🍴", "🥢", "🍉", "🍌", "🍍", "🍒", "🐍", "🍑", "🍆", "🌽", "🚀", "🥕", "🧅", "🍀", "🌿", "🌾", "🌵", "🌴", "🍃", "🍂", "🌳", "🌹", "🧄", "🚗", "🚓", "🚙", "🚎", "🚑", "🚒", "🚔", "🚲", "🛹", "🛴", "🚄", "🥦", "⚓", "🚦", "🏁", "🌌", "🪐", "🌏", "🧭", "🌋", "🏤", "🗼", "🌉", "🗽", "🧷", "🧹", "🧯", "⛅", "⭐", "🌠", "⚡", "🔥", "💧", "🌊", "🌘", "💥", "💯", "✅", "🌐", "📶", "💲"];

		input = parseInt(input, 16);
		input = input % emojiArray.length;

		return emojiArray[input];
	}

	/**
	 *
	 * @param arrayInput
	 * @param cutoff end index to slice the array
	 */
	static randomItemInArray = (arrayInput, cutoff) => {
		console.info("array length", arrayInput.length);
		if (cutoff && arrayInput.length > cutoff + 1)
			arrayInput = arrayInput.slice(0, cutoff);

		return arrayInput[Math.floor(Math.random() * arrayInput.length)];
	}
}
