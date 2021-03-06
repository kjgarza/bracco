import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  currentUser: service(),

  canWrite: computed('currentUser.role_id', function () {
    switch (this.get('currentUser.role_id')) {
      case 'staff_admin':
        return true;
      case 'consortium_admin':
      case 'provider_admin':
        return false;
      default:
        return false;
    }
  }),
  canUpdate: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repositories,providers}',
    function () {
      // let self = this;
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
        case 'provider_admin':
          // return this.get('model.providers').any(function(provider, index, providers) {
          //   return provider.get('id') === self.get('currentUser.provider_id');
          // });
          return false;
        default:
          return false;
      }
    }
  ),
  canRead: computed(
    'currentUser.{role_id,provider_id,client_id}',
    'model.{repositories,providers}',
    function () {
      let self = this;
      switch (this.get('currentUser.role_id')) {
        case 'staff_admin':
          return true;
        case 'consortium_admin':
          return true;
        case 'provider_admin':
          return true;
        // return this.get('model.providers').any(function(provider, index, providers) {
        //   return provider.get('id') === self.get('currentUser.provider_id');
        // });
        case 'client_admin':
          return this.get('model.repositories').any(function (repository) {
            return repository.get('id') === self.get('currentUser.client_id');
          });
        default:
          return false;
      }
    }
  )
});
