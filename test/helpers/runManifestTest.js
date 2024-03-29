'use strict';

var path = require('path');
var fs = require('fs');

var filter = require('array.prototype.filter');
var forEach = require('for-each');
var keys = require('object-keys');

module.exports = function runManifestTest(test, ES, edition) {
	test('ES' + edition + ' manifest', { skip: !fs.readdirSync }, function (t) {
		var files = filter(
			fs.readdirSync(path.join(__dirname, '../../' + edition), 'utf-8'),
			function rejectDotFile(file) { return file[0] !== '.'; }
		);
		var map = {
			AbstractEqualityComparison: 'Abstract Equality Comparison',
			AbstractRelationalComparison: 'Abstract Relational Comparison',
			StrictEqualityComparison: 'Strict Equality Comparison'
		};
		forEach(files, function (file) {
			var name = path.basename(file, path.extname(file));
			var actual = ES[map[name] || name];
			var expected = require(path.join(__dirname, '../../' + edition + '/', file)); // eslint-disable-line global-require
			t.equal(actual, expected, 'ES["' + name + '"] === ' + file);
		});
		var actualCount = keys(ES).length;
		t.equal(actualCount, files.length, 'expected ' + files.length + ' files, got ' + actualCount);
		t.end();
	});
};
