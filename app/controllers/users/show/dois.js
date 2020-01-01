import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'query', 'resource-type-id', 'provider-id', 'client-id', 'prefix', 'year', 'created', 'registered', 'state', 'sort', 'source', 'link-check-status', 'schema-version', 'certificate', 'page', 'size', 'affiliation' ],
  query: null,
  'resource-type-id': null,
  'provider-id': null,
  'client-id': null,
  prefix: null,
  year: null,
  created: null,
  registered: null,
  state: null,
  source: null,
  'link-check-status': null,
  sort: null,
  'schema-version': null,
  certificate: null,
  page: 1,
  size: 25,
  affiliation: true,
});
