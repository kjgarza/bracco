import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, RouteMixin, {
  flashMessages: Ember.inject.service(),

  model(params) {
    let self = this;
    this.store.findRecord('provider', params.provider_id).then(function(provider) {
      return provider;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  // afterModel(model, transition) {
  //   let unassignedUserCount = this.get('store').query('user', { 'provider-id': model.id, 'role-id': 'user', sort: 'name', 'page[size]': 10 }).then(function(users) {
  //     console.log(users)
  //   });
  //
  //   this.get('flashMessages').success('There are unassigned users.', {
  //     timeout: 5000,
  //     sticky: true
  //   });
  // },

  afterModel(model) {
    if (!this.can('read provider', model)) {
      let home = (this.get('currentUser.id')) ? this.get('currentUser').get('home') : '/';
      return this.transitionTo(home);
    }
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
