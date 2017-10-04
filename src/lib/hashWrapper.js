'use strict';

module.exports = obj => {
	const hashArray = [];
	Object.keys(obj).forEach(key => {
		hashArray.push(key);
		hashArray.push(obj[key]);
	});
	return hashArray;
};
