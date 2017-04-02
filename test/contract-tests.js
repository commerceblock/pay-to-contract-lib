const contract = require('../lib/contract');
const HDPublicKey = require('bitcore-lib/lib/hdpublickey');
const HDPrivateKey = require('bitcore-lib/lib/hdprivatekey');
const PublicKey = require('bitcore-lib/lib/publickey');
const assert = require('assert');


describe('contract tests', () => {

    it('generateChildHash', () => {
      const childName = 'hello-world';
      const hdPublicKey = HDPublicKey.fromString('xpub6BapBbRsbWSDQT6yMCiTXsJTJfdEVvi8AaV2zuSb2x8YQ4xJ7giyS8v4n8DmVf4giyNjHwZN2jj5dpgVYTDEncvmg84AnKWoPRqMpKyPW6h');
      const result = contract.generateChildHash(hdPublicKey, childName);

      assert.equal(result, '716582f0dbee8716fdab6f5f4f9a55185ddea1677fbaa25b312070849059deb57f5b1641657201460684afa247ea234639d6073a64c532e67a62e48681800bed');
    })

    it('signAndHashContract', () => {
      const contractContent = 'hello-world';
      const hdPublicKey = HDPublicKey.fromString('xpub6BapBbRsbWSDQT6yMCiTXsJTJfdEVvi8AaV2zuSb2x8YQ4xJ7giyS8v4n8DmVf4giyNjHwZN2jj5dpgVYTDEncvmg84AnKWoPRqMpKyPW6h');
      const result = contract.signAndHashContract(hdPublicKey.publicKey, contractContent);

      assert.equal(result, '4783d76602c58b243d8b73144c91e9ed1b255dd8e1c3844c32f27a96e20bbec698cfeb78c59928f2f4b0d78ac0e8f40cbb2ba935e3485e60b008b6c29c7256bc');
    })

    it('generateChildPublicKey', () => {
      const childName = "satoshi"
      const hdPublicKey = HDPublicKey.fromString('xpub6BapBbRsbWSDQT6yMCiTXsJTJfdEVvi8AaV2zuSb2x8YQ4xJ7giyS8v4n8DmVf4giyNjHwZN2jj5dpgVYTDEncvmg84AnKWoPRqMpKyPW6h');
      const result = contract.generateChildPublicKey(hdPublicKey, childName);

      assert.equal(result.toString(), 'xpub7DtvkafiqGSGpRmgLg7tj2aqYVpAdBFdqFEkVZxNndB3fxnhZdi3ZkMiT7uWAPW7o5CAr8Q427E1dVvNNJTVyJtndEHpy66PWS1YpGw46ha');
    })

    it('generateChildPrivateKey', () => {
      const childName = "satoshi"
      const hdPrivateKey = HDPrivateKey.fromString('xprv9v8nHsbWMhYY44amHzSgUXRmrK3hxATvv7ZkV5G7LQLvXEgwt3BNQJGF1YiSRGng9zsR7D6WTDBvpZDMpU1UgEMprjtccRCPf44WLawMfnC');
      const result = contract.generateChildPrivateKey(hdPrivateKey, childName);

      assert.equal(result.toString(), 'xprvAzfYpKAnREtyFYKQfgSKJRRzaiqSTVtLXADMN2FdA6gczsb6eH69eUzuRj297JceWeveJTeGtZP4PwN9eKts3gsRqJF1Vyn5NPx3Lzog8rq');
    })

})
