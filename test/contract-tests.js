const contract = require('../lib/contract');
const assert = require('assert');


describe('contract tests', () => {

    it('derivePath', () => {
      const result = contract.derivePath('6f1c618bbee04729eb87e72dabafb7312eb5da6ab5ecdd2d290d1c79ac455e7916bf76544330b9f735754f6e060663fe127a4ab8e2d99810f8cf10df4e551567')
      assert.equal(result, '28444/24971/48864/18217/60295/59181/43951/46897/11957/55914/46572/56621/10509/7289/44101/24185/5823/30292/17200/47607/13685/20334/1542/25598/4730/19128/58073/38928/63695/4319/20053/5479');
    });

});
