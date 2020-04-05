const _ = require('underscore');

export default {
  required: (value) => !!value || 'Required.',
  number: (value) => _.isNumber(value) || 'Must be a number',
  email: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
};
