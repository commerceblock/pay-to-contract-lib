const _ = require('lodash');

// constants
const CHUNK_LENGTH = 4;

exports.derivePath = (hash) => {
  const chunks = _.chunk(hash, CHUNK_LENGTH);
  const indexes = _.map(chunks, (hexArray) => {
    const hex = hexArray.join('')
    return parseInt(hex, 16)
  });
  const relativePath = indexes.join('/');
  return relativePath;
};
