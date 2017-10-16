export function initialize(application) {
  application.inject('adapter', 'currentUser', 'service:current-user');
  application.inject('ability', 'currentUser', 'service:current-user');
  application.inject('route', 'currentUser', 'service:current-user');
  application.inject('component', 'currentUser', 'service:current-user');
  application.inject('helper', 'currentUser', 'service:current-user');
}

export default {
  name: 'current-user',
  initialize: initialize
};