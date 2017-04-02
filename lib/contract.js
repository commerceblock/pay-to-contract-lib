const PrivateKey = require('bitcore-lib/lib/privatekey');
const PublicKey = require('bitcore-lib/lib/publickey');
const HDPrivateKey = require('bitcore-lib/lib/hdprivatekey');
const HDPublicKey = require('bitcore-lib/lib/hdpublickey');
const Point = require('bitcore-lib/lib/crypto/point');
const bn = require('bitcore-lib/lib/crypto/bn');
const bufferUtil = require('bitcore-lib/lib/util/buffer');
const hashUtil = require('bitcore-lib/lib/crypto/hash');
const _ = require('lodash');

// constants
const CHUNK_LENGTH = 4;
const PATH_PREFIX = 'm/0/';

const generateChildHash = exports.generateChildHash = function(hdPublicKey, childName) {
  const data = bufferUtil.concat([hdPublicKey.publicKey.toBuffer(), new Buffer(childName)]);
  const signature = hashUtil.sha512hmac(data, hdPublicKey._buffers.chainCode);
  const hash = hashUtil.sha512(signature).toString('hex');

  return hash;
};

const derivePath = exports.derivePath = function(hash) {
  const chunks = _.chunk(hash, CHUNK_LENGTH);
  const indexes = _.map(chunks, (hexArray) => {
    const hex = hexArray.join('')
    return parseInt(hex, 16)
  });
  const relativePath = indexes.join('/');

  return PATH_PREFIX + relativePath;
};

exports.signAndHashContract = function(publicKey, contractString) {
  const contractSeed = hashUtil.sha512hmac(new Buffer(contractString), publicKey.toBuffer());

  //TODO: might be able to simplified.
  const contractPublicKey = HDPrivateKey.fromSeed(contractSeed).privateKey.publicKey;

  const contractHash = hashUtil.sha512(contractPublicKey.toBuffer()).toString('hex')

  return contractHash;
};

exports.generateChildPublicKey = function(hdPublicKey, childName) {
  const hash = generateChildHash(hdPublicKey, childName);
  const derivedPath = derivePath(hash);

  return hdPublicKey.derive(derivedPath);
};

exports.generateChildPrivateKey = function(hdPrivateKey, childName) {
  const hash = generateChildHash(hdPrivateKey.hdPublicKey, childName);
  const derivedPath = derivePath(hash);

  return hdPrivateKey.derive(derivedPath);
};
