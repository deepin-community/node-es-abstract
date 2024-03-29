'use strict';

var assign = require('object.assign');

var hasSymbols = require('has-symbols')();
var hasBigInts = require('has-bigints')();
var arrowFunctions = require('make-arrow-function').list();
var generatorFunctions = require('make-generator-function')();
var asyncFunctions = require('make-async-function').list();
var IntlFallbackSymbol = require('intl-fallback-symbol');

var coercibleObject = { valueOf: function () { return 3; }, toString: function () { return 42; } };
var coercibleFnObject = {
	valueOf: function () { return function valueOfFn() {}; },
	toString: function () { return 42; }
};
var valueOfOnlyObject = { valueOf: function () { return 4; }, toString: function () { return {}; } };
var toStringOnlyObject = { valueOf: function () { return {}; }, toString: function () { return 7; } };
var uncoercibleObject = { valueOf: function () { return {}; }, toString: function () { return {}; } };
var uncoercibleFnObject = {
	valueOf: function () { return function valueOfFn() {}; },
	toString: function () { return function toStrFn() {}; }
};
var objects = [{}, coercibleObject, coercibleFnObject, toStringOnlyObject, valueOfOnlyObject];
var nullPrimitives = [undefined, null];
var nonIntegerNumbers = [-1.3, 0.2, 1.8, 1 / 3];
var int32s = [1, 7, 42];
var integerNumbers = int32s.concat([1e17]);
var zeroes = [0, -0];
var infinities = [Infinity, -Infinity];
var numbers = zeroes.concat([42], infinities, nonIntegerNumbers);
var strings = ['', 'foo', 'a\uD83D\uDCA9c'];
var booleans = [true, false];
var symbols = hasSymbols ? [].concat(
	Symbol.iterator,
	Symbol('foo'),
	IntlFallbackSymbol || []
) : [];
var wellKnownSymbols = hasSymbols ? [].concat(
	Symbol.iterator || [],
	Symbol.toStringTag || [],
	Symbol.hasInstance || [],
	Symbol.isConcatSpreadable || [],
	Symbol.asyncIterator || [],
	Symbol.match || [],
	Symbol.matchAll || [],
	Symbol.replace || [],
	Symbol.search || [],
	Symbol.species || [],
	Symbol.split || [],
	Symbol.toPrimitive || [],
	Symbol.unscopables || []
) : [];
var bigints = hasBigInts ? [BigInt(42), BigInt(0)] : [];
var nonSymbolPrimitives = [].concat(nullPrimitives, booleans, strings, numbers, bigints);
var nonNumberPrimitives = [].concat(nullPrimitives, booleans, strings, symbols);
var nonNullPrimitives = [].concat(booleans, strings, numbers, symbols, bigints);
var nonUndefinedPrimitives = [].concat(null, nonNullPrimitives);
var nonStrings = [].concat(nullPrimitives, booleans, numbers, symbols, objects, bigints);
var primitives = [].concat(nullPrimitives, nonNullPrimitives);
var nonPropertyKeys = [].concat(nullPrimitives, booleans, numbers, objects);
var propertyKeys = [].concat(strings, symbols);
var nonBooleans = [].concat(nullPrimitives, strings, symbols, numbers, objects);
var falsies = [].concat(nullPrimitives, false, '', 0, -0, NaN);
var truthies = [].concat(true, 'foo', 42, symbols, objects);
var timestamps = [].concat(0, 946713600000, 1546329600000);
var nonFunctions = [].concat(primitives, objects, [42]);
var nonArrays = [].concat(nonFunctions);
var nonBigInts = [].concat(nonNumberPrimitives, numbers);
var nonConstructorFunctions = [].concat(arrowFunctions, generatorFunctions, asyncFunctions);
var nonNumbers = nonNumberPrimitives.concat(objects);
var notNonNegativeIntegers = nonNumbers.concat(nonIntegerNumbers, NaN, infinities, [-1, -7, -42, -1e17]);

var descriptors = {
	configurable: function (descriptor) {
		return assign({}, descriptor, { '[[Configurable]]': true });
	},
	nonConfigurable: function (descriptor) {
		return assign({}, descriptor, { '[[Configurable]]': false });
	},
	enumerable: function (descriptor) {
		return assign({}, descriptor, { '[[Enumerable]]': true });
	},
	nonEnumerable: function (descriptor) {
		return assign({}, descriptor, { '[[Enumerable]]': false });
	},
	writable: function (descriptor) {
		return assign({}, descriptor, { '[[Writable]]': true });
	},
	nonWritable: function (descriptor) {
		return assign({}, descriptor, { '[[Writable]]': false });
	}
};

module.exports = {
	booleans: booleans,
	coercibleFnObject: coercibleFnObject,
	coercibleObject: coercibleObject,
	falsies: falsies,
	hasSymbols: hasSymbols,
	infinities: infinities,
	int32s: int32s,
	integerNumbers: integerNumbers,
	nonArrays: nonArrays,
	bigints: bigints,
	nonBigInts: nonBigInts,
	nonBooleans: nonBooleans,
	nonFunctions: nonFunctions,
	arrowFunctions: arrowFunctions,
	generatorFunctions: generatorFunctions,
	asyncFunctions: asyncFunctions,
	nonConstructorFunctions: nonConstructorFunctions,
	nonIntegerNumbers: nonIntegerNumbers,
	notNonNegativeIntegers: notNonNegativeIntegers,
	nonNullPrimitives: nonNullPrimitives,
	nonNumberPrimitives: nonNumberPrimitives,
	nonNumbers: nonNumbers,
	nonPropertyKeys: nonPropertyKeys,
	nonStrings: nonStrings,
	nonSymbolPrimitives: nonSymbolPrimitives,
	nonUndefinedPrimitives: nonUndefinedPrimitives,
	nullPrimitives: nullPrimitives,
	numbers: numbers,
	objects: objects,
	primitives: primitives,
	propertyKeys: propertyKeys,
	strings: strings,
	symbols: symbols,
	wellKnownSymbols: wellKnownSymbols,
	timestamps: timestamps,
	toStringOnlyObject: toStringOnlyObject,
	truthies: truthies,
	uncoercibleFnObject: uncoercibleFnObject,
	uncoercibleObject: uncoercibleObject,
	valueOfOnlyObject: valueOfOnlyObject,
	zeroes: zeroes,
	bothDescriptor: function () {
		return { '[[Get]]': function () {}, '[[Value]]': true };
	},
	bothDescriptorWritable: function () {
		return descriptors.writable({ '[[Get]]': function () {} });
	},
	accessorDescriptor: function (value) {
		return descriptors.enumerable(descriptors.configurable({
			'[[Get]]': function get() { return value; }
		}));
	},
	mutatorDescriptor: function () {
		return descriptors.enumerable(descriptors.configurable({
			'[[Set]]': function () {}
		}));
	},
	dataDescriptor: function (value) {
		return descriptors.nonWritable({
			'[[Value]]': arguments.length > 0 ? value : 42
		});
	},
	genericDescriptor: function () {
		return descriptors.configurable(descriptors.nonEnumerable());
	},
	assignedDescriptor: function (value) {
		return descriptors.configurable(descriptors.enumerable(descriptors.writable({ '[[Value]]': value })));
	},
	descriptors: descriptors
};
