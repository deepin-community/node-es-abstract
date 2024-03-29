'use strict';

var forEach = require('for-each');
var debug = require('object-inspect');

var assertRecord = require('../../helpers/assertRecord');
var v = require('es-value-fixtures');

module.exports = function assertRecordTests(ES, test) {
	test('Property Descriptor', function (t) {
		var record = 'Property Descriptor';

		forEach(v.nonUndefinedPrimitives, function (primitive) {
			t['throws'](
				function () { assertRecord(ES.Type, record, 'arg', primitive); },
				TypeError,
				debug(primitive) + ' is not a Property Descriptor'
			);
		});

		t['throws'](
			function () { assertRecord(ES.Type, record, 'arg', { invalid: true }); },
			TypeError,
			'invalid keys not allowed on a Property Descriptor'
		);

		t.doesNotThrow(
			function () { assertRecord(ES.Type, record, 'arg', {}); },
			'empty object is an incomplete Property Descriptor'
		);

		t.doesNotThrow(
			function () { assertRecord(ES.Type, record, 'arg', v.accessorDescriptor()); },
			'accessor descriptor is a Property Descriptor'
		);

		t.doesNotThrow(
			function () { assertRecord(ES.Type, record, 'arg', v.mutatorDescriptor()); },
			'mutator descriptor is a Property Descriptor'
		);

		t.doesNotThrow(
			function () { assertRecord(ES.Type, record, 'arg', v.dataDescriptor()); },
			'data descriptor is a Property Descriptor'
		);

		t.doesNotThrow(
			function () { assertRecord(ES.Type, record, 'arg', v.genericDescriptor()); },
			'generic descriptor is a Property Descriptor'
		);

		t['throws'](
			function () { assertRecord(ES.Type, record, 'arg', v.bothDescriptor()); },
			TypeError,
			'a Property Descriptor can not be both a Data and an Accessor Descriptor'
		);

		t.end();
	});
};
