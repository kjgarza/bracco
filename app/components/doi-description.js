import Component from '@ember/component';
import { computed } from '@ember/object';
import ISO6391 from 'iso-639-1';

const descriptionTypeList = [
  'Abstract',
  'Methods',
  'SeriesInformation',
  'TableOfContents',
  'TechnicalInfo',
  'Other'
];
const languageList = ISO6391.getAllNames();

export default Component.extend({
  descriptionTypeList,
  descriptionTypes: descriptionTypeList,
  languageList,
  languages: languageList,
  language: computed('fragment.lang', function () {
    return ISO6391.getName(this.get('fragment.lang'));
  }),

  seriesWarningMessage: computed('fragment.validations.attrs.description', function () {
    var validation = this.get('fragment.validations.attrs.description');
    if (validation.hasWarnings) {
      return validation.warningMessage;
    } else {
      return null;
    }
  }),

  isSeriesInformation: computed('fragment.descriptionType', function () {
    return this.get('fragment.descriptionType') == 'SeriesInformation';
  }),

  isValidating: computed.and('isSeriesInformation', 'seriesWarningMessage').readOnly(),

  actions: {
    updateDescription(value) {
      this.fragment.set('description', value);
    },
    deleteDescription() {
      this.model.get('descriptions').removeObject(this.fragment);
    },
    searchDescriptionType(query) {
      var descriptionTypes = descriptionTypeList.filter(function (descriptionType) {
        return descriptionType.toLowerCase().startsWith(query.toLowerCase());
      })
      this.set('descriptionTypes', descriptionTypes);
    },
    selectDescriptionType(descriptionType) {
      this.fragment.set('descriptionType', descriptionType);
      this.set('descriptionTypes', descriptionTypeList);
    },
    searchLanguage(query) {
      var languages = languageList.filter(function (language) {
        return language.toLowerCase().startsWith(query.toLowerCase());
      })
      this.set('languages', languages);
    },
    selectLanguage(language) {
      if (language) {
        this.fragment.set('lang', ISO6391.getCode(language));
      } else {
        this.fragment.set('lang', null);
      }
      this.set('languages', languageList);
    },
  }
});
