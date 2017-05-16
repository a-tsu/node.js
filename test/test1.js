// test1.js
assert = require('assert');

describe('mochaのテスト', function() {
	it('1 + 2は3になる', function() {
		assert.equal(1 + 3, 4);
	});
});

describe('mochaのテスト', function() {
	it('1 + 3は3にならない', function() {
		assert.notEqual(1 + 3, 3);
	});
});
