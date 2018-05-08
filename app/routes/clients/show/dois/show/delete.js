import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model() {
    let self = this;
    return this.store.findRecord('doi', this.modelFor('clients/show/dois/show').get('id'), { include: 'provider,client,resource-type' }).then(function(doi) {
      return doi;
    }).catch(function(reason){
      Ember.Logger.assert(false, reason);
      self.get('flashMessages').warning('DOI Fabrica is currently unavailable due to a DataCite API problem. We apologize for the inconvenience and are working hard to restore the service. Please check back later or contact DataCite Support if you have a question.');
      return self.transitionTo('/');
    });
  },

  afterModel() {
    if (!this.can('delete doi', this.modelFor('clients/show/dois/show'))) {
      return this.transitionTo('index');
    } else {
      this.modelFor('clients/show/dois/show').set('mode', 'delete');
    }
  }
});
