import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  // click,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | staff_admin | admin', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'admin',
      name: 'Admin',
      role_id: 'staff_admin',
    });
  });

  test('is logged in', async function(assert) {
    await visit('/');

    assert.dom('a#account_menu_link').hasText('ADMIN');
  });

  test('visiting homepage', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  // the following pages require authentication. Redirects to homepage otherwise
  // test('visiting settings', async function(assert) {
  //   await visit('/settings');

  //   assert.equal(currentURL(), '/settings');
  //   assert.dom('h2.work').hasText('DataCite');
  //   assert.dom('li a.nav-link.active').hasText('Settings');
  // });

  test('visiting providers', async function(assert) {
    await visit('/providers');

    assert.equal(currentURL(), '/providers');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Members');
  });

  test('visiting repositories', async function(assert) {
    await visit('/repositories');

    assert.equal(currentURL(), '/repositories');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('Repositories');
  });

  test('visiting prefixes', async function(assert) {
    await visit('/prefixes');

    assert.equal(currentURL(), '/prefixes');
    assert.dom('h2.work').hasText('DataCite');
  });

  test('visiting prefix 10.5038', async function(assert) {
    await visit('/prefixes/10.5038');

    assert.equal(currentURL(), '/prefixes/10.5038');
    assert.dom('div.alert-warning').includesText('The page was not found.');
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/dois');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('DOIs');
  });

  // test('visiting dois with click', async function(assert) {
  //   await visit('/dois');

  //   // first DOI in list
  //   await click('h3.work:first-child a');

  //   assert.dom('button#edit-doi').includesText('Update DOI (Form)');
  //   assert.dom('button#modify-doi').includesText('Update DOI (File Upload)');
  // });

  // test('visiting specific doi', async function(assert) {
  //   await authenticateSession({
  //     uid: 'admin',
  //     name: 'Admin',
  //     role_id: 'staff_admin',
  //   });
  //   await visit('/dois/10.70048%2Fe605-dg05');

  //   assert.equal(currentURL(), '/dois/10.70048%2Fe605-dg05');
  //   assert.dom('h2.work').hasText('10.70048/e605-dg05');
  // });

  // test('visiting specific doi draft', async function(assert) {
  //   await authenticateSession({
  //     uid: 'admin',
  //     name: 'Admin',
  //     role_id: 'staff_admin',
  //   });
  //   await visit('/dois/10.14454%2F0sd6-bh17');

  //   assert.equal(currentURL(), '/dois/10.14454%2F0sd6-bh17');
  //   assert.dom('h2.work').hasText('10.14454/0sd6-bh17');
  // });

  test('visiting users', async function(assert) {
    await visit('/users');

    assert.equal(currentURL(), '/users');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('h3.member-results').includesText('Users');
  });

  test('visiting specific user', async function(assert) {
    await visit('/users/0000-0003-1419-2405');

    assert.equal(currentURL(), '/users/0000-0003-1419-2405');
    assert.dom('h2.work').hasText('Martin Fenner');
  });
});
