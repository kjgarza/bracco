import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Ability | organization', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let ability = this.owner.lookup('ability:organization');
    assert.ok(ability);
  });
});
