import { moduleForModel, test } from 'ember-qunit';

moduleForModel('doi', 'Unit | Model | doi', {
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
