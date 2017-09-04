import Ember from 'ember';

const roles = [{ 'id': 'staff_admin', 'name': "Staff admin" },
               { 'id': 'provider_admin', 'name': "Provider admin" },
               { 'id': 'client_admin', 'name': "Client admin" },
               { 'id': 'user', 'name': 'User' }];

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'div',
  classNames: ['panel', 'panel-default'],
  edit: false,
  role: { 'id': 'user', 'name': 'User' },
  roles: roles,
  provider: null,
  providers: [],
  client: null,
  clients: [],

  showProviders: false,
  showClients: false,

  selectRole(roleId) {
    this.set('role', roles.findBy('id', roleId));
    this.set('showProviders', Ember.String.w("provider_admin client_admin").includes(roleId));
  },
  selecProvider(providerId) {
    this.set('showClients', Ember.isPresent(providerId));
  },

  actions: {
    edit: function(user) {
      this.set('edit', true);
      this.selectRole(user.get('role'));
      if (this.get('showProviders')) {
        this.set('providers', this.get('store').query('provider', { 'page[size]': 10 }));
      }
      if (this.get('showClients')) {
        this.set('clients', this.get('store').query('client', { 'page[size]': 10 }));
      }
    },
    searchProvider: function(query) {
      this.set('providers', this.get('store').query('provider', { 'query': query, 'page[size]': 10 }));
    },
    searchClient: function(query) {
      this.set('data-centers', this.get('store').query('data-center', { 'query': query, 'page[size]': 10 }));
    },
    submit: function() {
      this.set('edit', false);
    },
    cancel: function() {
      this.set('edit', false);
    },
    selectRole(role) {
      this.selectRole(role.id);
    },
    selectProvider(provider) {
      this.selectProvider(provider.id);
    }
  }
});
