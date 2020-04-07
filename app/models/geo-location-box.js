import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import MF from 'ember-data-model-fragments';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  westBoundLongitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -180.00 ≤ westBoundLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180,
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'westBoundLongitude must be included if you input a GeoLocation Box.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.eastBoundLongitude','model.southBoundLatitude','model.northBoundLatitude', function() {
        return isBlank(this.model.get('eastBoundLongitude')) && isBlank(this.model.get('southBoundLatitude')) && isBlank(this.model.get('northBoundLatitude'));
      }),
    }),
  ],
  eastBoundLongitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -180.00 ≤ eastBoundLongitude ≤ 180.00 ',
      gte: -180,
      lte: 180,
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'eastBoundLongitude must be included if you input a GeoLocation Box.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.westBoundLongitude','model.southBoundLatitude','model.northBoundLatitude', function() {
        return isBlank(this.model.get('westBoundLongitude')) && isBlank(this.model.get('southBoundLatitude')) && isBlank(this.model.get('northBoundLatitude'));
      }),
    }),
  ],
  southBoundLatitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -90.00 ≤ southBoundLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90,
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'southBoundLatitude must be included if you input a GeoLocation Box.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.westBoundLongitude','model.eastBoundLongitude','model.northBoundLatitude', function() {
        return isBlank(this.model.get('westBoundLongitude')) && isBlank(this.model.get('eastBoundLongitude')) && isBlank(this.model.get('northBoundLatitude'));
      }),
    }),
  ],
  northBoundLatitude: [
    validator('number', {
      allowString: true,
      allowBlank: true,
      message: 'Domain: -90.00 ≤ northBoundLatitude ≤ 90.00 ',
      gte: -90,
      lte: 90,
    }),
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'northBoundLatitude must be included if you input a GeoLocation Box.',
      isWarning: computed('model.state', function() {
        return this.model.get('state') === 'draft';
      }),
      disabled: computed('model.eastBoundLongitude','model.southBoundLatitude','model.westBoundLongitude', function() {
        return isBlank(this.model.get('eastBoundLongitude')) && isBlank(this.model.get('southBoundLatitude')) && isBlank(this.model.get('westBoundLongitude'));
      }),
    }),
  ],
});

export default MF.Fragment.extend(Validations, {
  southBoundLatitude: DS.attr('number',{ defaultValue: null }),
  northBoundLatitude: DS.attr('number',{ defaultValue: null }),
  westBoundLongitude: DS.attr('number',{ defaultValue: null }),
  eastBoundLongitude: DS.attr('number',{ defaultValue: null }),
});