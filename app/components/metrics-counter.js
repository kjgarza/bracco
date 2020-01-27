import Component from '@ember/component';


export default Component.extend({
  tagName: 'div',
  classNames: [ 'col-lg-3', 'col-md-4' ],
  data: null,
  label: '',
  count: 0,
  init() {
    this._super();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.model[`${this.label.toLowerCase()}s`] != null) {
      this.set('count', this.model[`${this.label.toLowerCase()}s`]);
    }
  },
});
