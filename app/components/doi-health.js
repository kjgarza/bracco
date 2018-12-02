import Ember from 'ember';

export default Ember.Component.extend({

  downloadLatency: Ember.computed(function() {
    var rawLatency = this.get('model').get("landingPage").result['downloadLatency'];
    return Math.round(rawLatency)
  }),

  bodyHasDoi: Ember.computed(function() {
    if (this.get('model').get("landingPage").result['bodyHasPid']) {
      return "Yes";
    } else {
      return "No";
    }
  }),

  hasSchemaOrg: Ember.computed(function() {
    if (this.get('model').get("landingPage").result['hasSchemaOrg']) {
      return "Yes";
    } else {
      return "No";
    }
  }),

  isStatusError: Ember.computed(function() {
    return this.get('model').get("landingPage").status != 200;
  }),

  hasHttpInfo: Ember.computed(function() {
    if (this.get('model').get("landingPage").status) {
      return true;
    } else {
      return false;
    }
  }),

  hasError: Ember.computed(function() {
    if (this.get('model').get("landingPage").result.error) {
      return true;
    } else {
      return false;
    }
  }),

});