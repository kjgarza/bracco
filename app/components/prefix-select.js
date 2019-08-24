import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),

  prefixes: [],

  searchPrefix(query) {
    if (this.client) {
      this.set('prefixes', this.store.query('prefix', { query: query, 'provider-id': this.client.get('provider').get('id'), state: 'without-client', sort: 'name', 'page[size]': 25 }));
    } else {
      this.set('prefixes', this.store.query('prefix', { query: query, state: 'unassigned', sort: 'name', 'page[size]': 25 }));
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.searchPrefix(null);
  },

  actions: {
    searchPrefix(query) {
      this.searchPrefix(query);
    },
    selectPrefix(prefix) {
      this.model.set('prefix', prefix);
    }
  }
});
