import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  store: service(),

  actions: {
    submit() {
      let self = this;
      let repositoryPrefix = this.store.createRecord('repositoryPrefix', { repository: this.get('model.repository'), prefix: this.get('model.prefix.prefix') });
      repositoryPrefix.save().then(function(repositoryPrefix) {
        self.transitionToRoute('repositories.show.prefixes', repositoryPrefix.get('repository').get('id'));
      }).catch(function(reason) {
        console.debug(reason);
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.prefixes', this.get('model.repository'));
    },
  },
});