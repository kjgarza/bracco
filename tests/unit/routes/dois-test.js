import { moduleFor, test } from 'ember-qunit';

moduleFor('route:dois', 'Unit | Route | dois', {
  // Specify the other units that are required for this test.
  needs: ['service:google-analytics']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});